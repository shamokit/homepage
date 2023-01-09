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
	lg: 1024,
	xl: 1280,
	xlx: 1536,
} as const
