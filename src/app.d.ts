/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Window {
		Cognito?: {
			load: (mode: string, config: Record<string, unknown>, opts: Record<string, unknown>) => void;
		};
	}
}

export {};
