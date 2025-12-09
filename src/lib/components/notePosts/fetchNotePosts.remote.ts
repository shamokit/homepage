import { query } from '$app/server';

type Posts = {
	data: {
		contents: {
			id: number;
			name: string;
			noteUrl: string;
			publishAt: string;
		}[];
	};
};
export const fetchNotePosts = query(async () => {
	const response = await fetch(
		'https://note.com/api/v2/creators/shamokit_y2323/contents?kind=note&page=1'
	);
	const data = (await response.json()) as Posts;
	return data.data.contents.slice(0, 4).map(({ id, name, noteUrl, publishAt }) => ({
		id: id.toString(),
		link: noteUrl,
		title: name,
		pubDate: publishAt
	}));
});
