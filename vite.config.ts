import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import fs from 'fs';
const config: UserConfig = {
	plugins: [sveltekit(), rawFonts(['.ttf'])]
};
function rawFonts(ext: string[]) {
	return {
		name: 'vite-plugin-raw-fonts',
		transform(code: string, id: string) {
			if (ext.some((e) => id.endsWith(e))) {
				const buffer = fs.readFileSync(id);
				return { code: `export default ${JSON.stringify(buffer)}`, map: null };
			}
		}
	};
}
export default config;
