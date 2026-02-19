/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// Extend the Window interface to include the dataLayer property, which is commonly used for Google Tag Manager and other analytics tools.
declare global {
	interface Window {
		dataLayer: Array<Record<string, unknown>>;
	}
}

export {};
