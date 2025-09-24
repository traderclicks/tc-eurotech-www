
// this file is generated — do not edit it


declare module "svelte/elements" {
	export interface HTMLAttributes<T> {
		'data-sveltekit-keepfocus'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-noscroll'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-preload-code'?:
			| true
			| ''
			| 'eager'
			| 'viewport'
			| 'hover'
			| 'tap'
			| 'off'
			| undefined
			| null;
		'data-sveltekit-preload-data'?: true | '' | 'hover' | 'tap' | 'off' | undefined | null;
		'data-sveltekit-reload'?: true | '' | 'off' | undefined | null;
		'data-sveltekit-replacestate'?: true | '' | 'off' | undefined | null;
	}
}

export {};


declare module "$app/types" {
	export interface AppTypes {
		RouteId(): "/" | "/robots.txt" | "/sitemap.xml" | "/theme";
		RouteParams(): {
			
		};
		LayoutParams(): {
			"/": Record<string, never>;
			"/robots.txt": Record<string, never>;
			"/sitemap.xml": Record<string, never>;
			"/theme": Record<string, never>
		};
		Pathname(): "/" | "/robots.txt" | "/robots.txt/" | "/sitemap.xml" | "/sitemap.xml/" | "/theme" | "/theme/";
		ResolvedPathname(): `${"" | `/${string}`}${ReturnType<AppTypes['Pathname']>}`;
		Asset(): "/DSC00977.jpg" | "/DSC00981.jpg" | "/bmw-logo.jpg" | "/eurotech-logo-white.png" | "/eurotech-logo.png" | "/eurotech-main-logo.png" | "/favicon.svg" | "/icons/facebook.svg" | "/icons/google.svg" | "/icons/instagram.svg" | "/icons/linkedin.svg" | "/icons/twitter.svg" | "/images/placeholder.svg" | "/jaguar-logo-lg.jpg" | "/mini-logo-lg.jpg" | "/mta-logo.png" | "/og-image-generator.svg" | string & {};
	}
}