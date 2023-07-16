import type { MicroCMSListContent } from '$lib/libs/microcms.server';
export type Tag = {
	title: string
	slug: string
} & MicroCMSListContent
