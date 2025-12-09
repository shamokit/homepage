import { query } from '$app/server';

type Posts = {
	items: {
		id: string;
		link: string;
		title: string;
		pubDate: string;
	}[];
};
export const fetchZennPosts = query(async () => {
	const response = await fetch(
		'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fzenn.dev%2Fshamokit%2Ffeed'
	);
	const data = (await response.json()) as Posts;
	return data.items.slice(0, 4);
});
