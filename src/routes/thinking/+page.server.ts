import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/libs/microcms.server';
export const load = (async () => {
	const thinkings = await client.getList({
		endpoint: 'thinking',
		queries: {
			limit: 9
		}
	})
	if (thinkings) {
		return {
			thinkings
		};
	}
	throw error(400, 'エラー');
}) satisfies PageServerLoad;
