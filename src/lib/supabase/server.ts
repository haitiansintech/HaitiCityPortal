import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

type CookieMode = "read" | "write";

async function initServerSupabase(mode: CookieMode) {
  const jar = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return jar.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          if (mode === "write") {
            jar.set({ name, value, ...options });
          }
        },
        remove(name: string, options: CookieOptions) {
          if (mode === "write") {
            jar.set({ name, value: "", ...options, maxAge: 0 });
          }
        },
      },
    }
  );
}

/**
 * Create a Supabase client for Server Components. Cookie writes are disabled to
 * satisfy Next.js 15 restrictions during render.
 */
export async function createServerSupabase() {
  return initServerSupabase("read");
}

/**
 * Create a Supabase client for Server Actions or Route Handlers where cookie
 * mutations are permitted.
 */
export async function createServerSupabaseWithAccess() {
  return initServerSupabase("write");
}
