/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			isPreviewMode: boolean;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};