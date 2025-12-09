import { query } from '$app/server';

type Posts = {
	items: {
		id: string;
		link: string;
		title: string;
		pubDate: string;
	}[];
};
export const fetchQiitaPosts = query(async () => {
	const response = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fqiita.com%2Fshamokit%2Ffeed.atom'
	);
	const data = (await response.json()) as Posts;
	return data.items.slice(0, 4);
});
