import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
const config: UserConfig = {
	plugins: [wasm(), topLevelAwait(), sveltekit()],
	worker: {
		format: 'es',
		plugins: [wasm(), topLevelAwait()]
	}
};
export default config;
