import type { IconNames } from '$lib/components/svg/const';
export type Link = {
	name: string;
	slug: string;
	iconName?: IconNames[number];
}
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
		name: 'Thinking',
		slug: '/thinking'
	},
	{
		name: 'Contact',
		slug: '/contact',
		iconName: 'email'
	}
]

export const BREAK_POINTS = {
	min: 375,
	sm: 600,
	md: 768,
	lg: 1120,
	xl: 1280,
	xlx: 1536,
} as const

export const contactList = {
	qiita: {
		name: 'Qiita',
		url: 'https://qiita.com/shamokit'
	},
	zenn: {
		name: 'Zenn',
		url: 'https://zenn.dev/shamokit'
	},
	instagram: {
		name: 'Instagram',
		url: 'https://www.instagram.com/hokke_to_unagi/'
	},
	twitter: {
		name: 'Twitter',
		url: 'https://twitter.com/shamokit_y2323'
	},
	github: {
		name: 'GitHub',
		url: 'https://github.com/shamokit'
	},
 } as const
