import { env } from '$env/dynamic/private';
import { client } from '$lib/libs/microcms.server';
import type { ThinkingResponse } from '$lib/schema/thinking/thinking';
import type { MicroCMSListResponse } from 'microcms-js-sdk';
export const prerender = true;

type Posts = {
	items: {
		id: string;
		link: string;
		title: string;
		pubDate: string;
	}[];
};
const postNum = 4;

export const load = async ({ fetch }) => {
	const [qiitaResponse, zennResponse] = await Promise.all([
		fetch(
			'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fqiita.com%2Fshamokit%2Ffeed.atom'
		),
		fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fzenn.dev%2Fshamokit%2Ffeed')
	]);
	const [zenn, qiita, thinkings] = (await Promise.all([
		qiitaResponse.json(),
		zennResponse.json(),
		client.getList<ThinkingResponse>({
			endpoint: 'thinking',
			queries: {
				limit: 9
			}
		})
	])) as [Posts, Posts, MicroCMSListResponse<ThinkingResponse>];

	const { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } = env;
	const instagramUrl = `https://graph.facebook.com/v15.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=name,media.limit(12){media_url,permalink,caption}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
	return {
		zenn: zenn.items.slice(0, postNum),
		qiita: qiita.items.slice(0, postNum),
		thinkings,
		streamed: {
			photos: (await fetch(instagramUrl)).json() as Promise<{
				media: {
					data: {
						id: string;
						media_url: string;
						permalink: string;
						caption: string;
					}[];
				};
			}>
		}
	};
};
