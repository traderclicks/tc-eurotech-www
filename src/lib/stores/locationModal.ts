import { writable } from 'svelte/store';

// Shared open/closed state for the location/address modal rendered in Header.svelte.
// Any component can open it (BrandStrip, NavigationMenu, etc.); Header owns the markup.
export const locationOpen = writable(false);
