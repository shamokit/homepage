import { error } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { PageServerLoad } from './$types';
import axios from 'axios';
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
	if (photos) {
		return photos.data.media;
	}
	throw error(400, '写真を取得できませんでした。');
}) satisfies PageServerLoad;
