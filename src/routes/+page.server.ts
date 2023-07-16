import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import axios from 'axios';
import { client } from '$lib/libs/microcms.server';
export const prerender = true
export const load = (async () => {
	const { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } = env;
	const instagramUrl = `https://graph.facebook.com/v15.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=name,media.limit(12){media_url,permalink,caption}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
	const getPhotos = axios.get<{
		media: {
			data: {
				id: string;
				media_url: string;
				permalink: string;
				caption: string;
			}[];
		};
	}>(instagramUrl);

	type Posts = {
		items: {
			id: string,
			link: string,
			title: string,
			pubDate: string,
		}[]
	}
	const qiita = await axios.get<Posts>('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fqiita.com%2Fshamokit%2Ffeed.atom');
	const zenn = await axios.get<Posts>('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fzenn.dev%2Fshamokit%2Ffeed');
	const postNum = 4;
	const thinkings = client.getList({
		endpoint: 'thinking',
		queries: {
			limit: 9
		}
	})
	if (qiita && zenn) {
		return {
			zenn: zenn.data.items.slice(0, postNum),
			qiita: qiita.data.items.slice(0, postNum),
			thinkings: thinkings,
			streamed: {
				photos: getPhotos.then((res) => res.data.media.data)
			}
		};
	}
	throw error(400, 'エラー');
}) satisfies PageServerLoad;
