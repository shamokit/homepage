import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/libs/microcms';
import type { ThinkingResponse } from '$lib/schema/thinking/thinking';
export const load = (async ({params}) => {
	const thinkings = await client.getList<ThinkingResponse>({
		endpoint: 'thinking',
		queries: {
			limit: 1,
			filters: `slug[equals]${params.slug}`
		}
	})
	const thinking = thinkings.contents[0]
	if (thinking) {
		return {
			thinking
		};
	}
	throw error(400, '記事を取得できませんでした。');
}) satisfies PageServerLoad;
