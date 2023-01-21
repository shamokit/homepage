import wasm from "vite-plugin-wasm";
import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
const config: UserConfig = {
	plugins: [wasm(), sveltekit()]
};
export default config;
