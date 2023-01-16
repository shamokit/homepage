import type { Mv } from './mv';
import type { Contents } from './content';
import type { Meta } from './meta';
import type { MicroCMSListContent } from '$lib/libs/microcms';
export type StaticPageResponse = {
	title: string;
	slug: string;
	lead: { fieldId: 'mv' } & Mv;
	body: { fieldId: 'contents' } & Contents;
	meta?: { fieldId: 'meta' } & Meta;
} & MicroCMSListContent;
