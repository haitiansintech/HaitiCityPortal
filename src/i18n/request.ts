import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
    // This typically corresponds to the `[locale]` segment
    const resolvedLocale = await requestLocale;
    const activeLocale = routing.locales.includes(resolvedLocale as any)
        ? (resolvedLocale as (typeof routing)["locales"][number])
        : routing.defaultLocale;

    return {
        locale: activeLocale,
        messages: (await import(`../../messages/${activeLocale}.json`)).default,
        timeZone: 'America/Port-au-Prince',
    };
});
