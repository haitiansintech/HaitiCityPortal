import { cookies } from "next/headers";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

/**
 * Next 15: cookies() is async. We build the cookie methods explicitly.
 */
export async function createServerSupabase() {
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
          jar.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          jar.set({ name, value: "", ...options, maxAge: 0 });
        },
      },
    }
  );
}
