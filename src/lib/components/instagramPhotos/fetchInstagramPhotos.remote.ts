import { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } from '$env/static/private';
import { query } from '$app/server';

export const fetchInstagramPhotos = query(async () => {
	const instagramUrl = `https://graph.facebook.com/v15.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}?fields=name,media.limit(12){media_url,permalink,caption}&access_token=${INSTAGRAM_ACCESS_TOKEN}`;
	const photosResponse = await fetch(instagramUrl);
	const photos = (await photosResponse.json()) as {
		media: {
			data: {
				id: string;
				media_url: string;
				permalink: string;
				caption: string;
			}[];
		};
	};
	return photos.media.data.map(({ permalink, media_url, caption }) => ({
		permalink,
		media_url,
		caption
	}));
});
