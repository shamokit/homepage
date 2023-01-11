import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { client } from '$lib/functions/microcms';
import type { StaticPageResponse } from '$lib/schema/staticPage';
export const load = (async ({params}) => {
	const pages = await client.getList<StaticPageResponse>({
		endpoint: 'static_page',
		queries: {
			limit: 1,
			filters: `slug[equals]${params.slug}`
		}
	})
	const page = pages.contents[0]
	if (page) {
		console.log(page)
		return {
			page
		};
	}
	throw error(400, 'エラー');
}) satisfies PageServerLoad;
