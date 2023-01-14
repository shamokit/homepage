import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import axios from 'axios';
import Parser from "rss-parser"
export const load = (async () => {
	const { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } = env;
	const instagramUrl = `https://graph.facebook.com/v15.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=name,media.limit(12){media_url,permalink}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
	const photos = await axios.get<{
		media: {
			data: {
				id: string;
				media_url: string;
				permalink: string;
			}[];
		};
	}>(instagramUrl);

	const parser = new Parser<{
		items: {
			id: string,
			link: string,
			title: string,
			isoDate: string,
		}[]
	}>();
	const qiita = await parser.parseURL('https://qiita.com/shamokit/feed.atom');
	const zenn = await parser.parseURL('https://zenn.dev/shamokit/feed');
	const postNum = 4;
	if (photos && qiita && zenn) {
		return {
			photos: photos.data.media,
			zenn: zenn.items.slice(0, postNum),
			qiita: qiita.items.slice(0, postNum),
		};
	}
	throw error(400, 'エラー');
}) satisfies PageServerLoad;
