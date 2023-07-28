import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/libs/microcms.server';
import type { StaticPageResponse } from '$lib/schema/staticPage/staticPage';
export const load = (async ({ params }) => {
	const pages = await client.getList<StaticPageResponse>({
		endpoint: 'static_page',
		queries: {
			limit: 1,
			filters: `slug[equals]${params.slug}`
		}
	});
	const page = pages.contents[0];
	if (page) {
		return {
			page
		};
	}
	throw error(400, '記事を取得できませんでした。');
}) satisfies PageServerLoad;
