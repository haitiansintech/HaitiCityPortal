import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Merges Tailwind CSS class names safely, resolving conflicts in favour of
 * later values.
 *
 * Internally this combines two utilities:
 *  - `clsx` — accepts any mix of strings, arrays, and conditional objects
 *    (e.g. `{ "text-red-500": hasError }`) and flattens them into a single
 *    space-separated class string.
 *  - `tailwind-merge` — deduplicates and resolves conflicting Tailwind
 *    utilities so that the last class wins. For example,
 *    `cn("px-4", "px-6")` produces `"px-6"` rather than `"px-4 px-6"`,
 *    which would otherwise apply both and let the CSS cascade decide
 *    unpredictably.
 *
 * Use this function everywhere class names are composed from multiple sources
 * (component defaults + caller overrides, conditional classes, etc.).
 *
 * @param inputs - Any number of class values: strings, arrays, or conditional
 *   objects accepted by clsx.
 * @returns A deduplicated, conflict-resolved Tailwind class string.
 *
 * @example
 * cn("px-4 py-2 bg-white", isActive && "bg-brand-blue", className)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
