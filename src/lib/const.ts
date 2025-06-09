import type { IconNames } from '$lib/components/svg/const';
export type Link = {
	name: string;
	slug: string;
	iconName?: IconNames[number];
};
export const SITE_URL = 'https://shamokit.com';
export const OG_IMAGE_URL = 'https://shamokit-ogimage.shamokit.workers.dev';
export const links: Link[] = [
	{
		name: 'Home',
		slug: '/'
	},
	{
		name: 'About',
		slug: '/about'
	},
	{
		name: 'Contact',
		slug: '/contact',
		iconName: 'email'
	}
];

export const BREAK_POINTS = {
	min: 375,
	sm: 600,
	md: 768,
	lg: 1120,
	xl: 1280,
	xlx: 1536
} as const;

export const contactList = {
	qiita: {
		name: 'Qiita',
		url: 'https://qiita.com/shamokit'
	},
	zenn: {
		name: 'Zenn',
		url: 'https://zenn.dev/shamokit'
	},
	note: {
		name: 'note',
		url: 'https://note.com/shamokit_y2323'
	},
	instagram: {
		name: 'Instagram',
		url: 'https://www.instagram.com/hokke_to_unagi/'
	},
	x: {
		name: 'X',
		url: 'https://x.com/shamokit_y2323'
	},
	github: {
		name: 'GitHub',
		url: 'https://github.com/shamokit'
	}
} as const;
