#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");
const fs = require("fs");
const vm = require("vm");
const ts = require("typescript");
const { pathToFileURL } = require("url");
const { createRequire } = require("module");
const tailwind = require("tailwindcss");
const { compile, __unstable__loadDesignSystem } = tailwind;

const readFile = fs.promises.readFile;
const writeFile = fs.promises.writeFile;
const mkdir = fs.promises.mkdir;
const readdir = fs.promises.readdir;

const projectRoot = path.resolve(__dirname, "..");
const sourceCssPath = path.resolve(projectRoot, "src/app/globals.css");
const outputCssPath = path.resolve(projectRoot, "src/app/compiled.css");
const tailwindConfigPath = path.resolve(projectRoot, "tailwind.config.ts");

const projectRequire = createRequire(path.join(projectRoot, "package.json"));

async function loadTailwindConfig(configPath: string) {
  const source = await readFile(configPath, "utf8");
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
    fileName: configPath,
  });

  const moduleScope = { exports: {} };
  const context = {
    module: moduleScope,
    exports: moduleScope.exports,
    require: createRequire(pathToFileURL(configPath)),
    __dirname: path.dirname(configPath),
    __filename: configPath,
    process,
    console,
  };

  const script = new vm.Script(transpiled.outputText, { filename: configPath });
  script.runInNewContext(context);

  return (moduleScope.exports as any).default ?? moduleScope.exports;
}

const SUPPORTED_EXTENSIONS = new Set([
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".mjs",
  ".cjs",
  ".md",
  ".mdx",
  ".html",
]);

async function collectProjectContent() {
  const startDir = path.resolve(projectRoot, "src");
  const stack = [startDir];
  const files = [];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) continue;
    let entries;
    try {
      entries = await readdir(current, { withFileTypes: true });
    } catch (e: any) {
      const error = e;
      if (error.code === "ENOENT") {
        continue;
      }
      throw error;
    }

    for (const entry of entries) {
      if (entry.name.startsWith(".")) continue;
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(fullPath);
      } else if (SUPPORTED_EXTENSIONS.has(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
  }

  const parts = [];
  for (const filePath of files) {
    try {
      const content = await readFile(filePath, "utf8");
      parts.push(content);
    } catch (e: any) {
      const error = e;
      if (error.code !== "ENOENT") {
        throw error;
      }
    }
  }

  return parts.join("\n");
}

function normalizeStylesheetSpecifier(specifier: string) {
  if (specifier === "tailwindcss") {
    return "tailwindcss/index.css";
  }
  if (specifier === "tailwindcss/colors") {
    return "tailwindcss/colors.css";
  }
  return specifier;
}

function toResolutionPaths(fromBase?: string) {
  const paths = [];
  if (fromBase && typeof fromBase === "string" && fromBase.length > 0) {
    paths.push(fromBase);
  }
  paths.push(projectRoot);
  return paths;
}

function resolveStylesheet(specifier: string, fromBase?: string) {
  const normalized = normalizeStylesheetSpecifier(specifier);
  if (normalized.startsWith(".") || normalized.startsWith("/")) {
    const base = fromBase && fromBase.length > 0 ? fromBase : projectRoot;
    return path.resolve(base, normalized);
  }
  try {
    return projectRequire.resolve(normalized, { paths: toResolutionPaths(fromBase) });
  } catch (e: any) {
    throw new Error(`Unable to resolve stylesheet \"${specifier}\" from ${fromBase ?? "project root"}: ${e.message}`);
  }
}

function resolveModuleSpecifier(specifier: string, fromBase?: string) {
  if (specifier.startsWith(".") || specifier.startsWith("/")) {
    const base = fromBase && fromBase.length > 0 ? fromBase : projectRoot;
    return path.resolve(base, specifier);
  }
  try {
    return projectRequire.resolve(specifier, { paths: toResolutionPaths(fromBase) });
  } catch (e: any) {
    throw new Error(`Unable to resolve module \"${specifier}\" from ${fromBase ?? "project root"}: ${e.message}`);
  }
}

async function importModule(resolvedPath: string) {
  try {
    const required = projectRequire(resolvedPath);
    return required && required.default ? required.default : required;
  } catch (e: any) {
    const error = e;
    if (error.code === "ERR_REQUIRE_ESM" || /Cannot use import statement/.test(error.message)) {
      const imported = await import(pathToFileURL(resolvedPath).href);
      return imported && imported.default ? imported.default : imported;
    }
    throw error;
  }
}

async function loadStylesheet(specifier: string, fromBase?: string) {
  const resolvedPath = resolveStylesheet(specifier, fromBase);
  const content = await readFile(resolvedPath, "utf8");
  return {
    content,
    base: path.dirname(resolvedPath),
    path: resolvedPath,
  };
}

async function loadModule(specifier: string, fromBase?: string) {
  const resolvedPath = resolveModuleSpecifier(specifier, fromBase);
  const loadedModule = await importModule(resolvedPath);
  return {
    module: loadedModule,
    base: path.dirname(resolvedPath),
    path: resolvedPath,
  };
}

async function buildTailwind() {
  const cssSource = await readFile(sourceCssPath, "utf8");
  const config = await loadTailwindConfig(tailwindConfigPath);
  const aggregatedContent = await collectProjectContent();

  const compileConfig = { ...config, content: [] };

  const options = {
    base: path.dirname(sourceCssPath),
    from: sourceCssPath,
    loadStylesheet,
    loadModule,
    config: compileConfig,
  };

  const result = await compile(cssSource, options);
  const designSystem = await __unstable__loadDesignSystem(cssSource, options);
  const classEntries = designSystem.getClassList();
  const usedCandidates = [];

  if (aggregatedContent.length > 0) {
    for (const [candidate] of classEntries) {
      if (aggregatedContent.includes(candidate)) {
        usedCandidates.push(candidate);
      }
    }
  }

  const compiledCss = result.build(usedCandidates);
  await mkdir(path.dirname(outputCssPath), { recursive: true });
  await writeFile(outputCssPath, compiledCss);
}

buildTailwind().catch((error) => {
  console.error("Failed to generate Tailwind CSS:", error);
  process.exitCode = 1;
});
