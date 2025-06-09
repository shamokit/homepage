import { INSTAGRAM_BUSINESS_ACCOUNT_ID, INSTAGRAM_ACCESS_TOKEN } from '$env/static/private';
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
	const [qiitaResponse, zennResponse, noteResponse] = await Promise.all([
		fetch(
			'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fqiita.com%2Fshamokit%2Ffeed.atom'
		),
		fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fzenn.dev%2Fshamokit%2Ffeed'),
		fetch('https://note.com/api/v2/creators/shamokit_y2323/contents?kind=note&page=1')
	]);
	const [qiita, zenn, note] = (await Promise.all([
		qiitaResponse.json(),
		zennResponse.json(),
		noteResponse.json()
	])) as [
		Posts,
		Posts,
		{
			data: {
				contents: {
					id: number;
					name: string;
					noteUrl: string;
					publishAt: string;
				}[];
			};
		}
	];

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
	return {
		posts: {
			qiita: qiita.items.slice(0, postNum),
			zenn: zenn.items.slice(0, postNum),
			note: note.data.contents.slice(0, postNum).map(({ id, name, noteUrl, publishAt }) => ({
				id: id.toString(),
				link: noteUrl,
				title: name,
				pubDate: publishAt
			}))
		},
		photos: photos.media.data.map(({ permalink, media_url, caption }) => ({
			permalink,
			media_url,
			caption
		}))
	};
};
