import type { Tag } from '../tag/tag';
import type { Meta } from './meta';
import type { Section } from './section';
import type { MicroCMSListContent } from '$lib/libs/microcms';
export type ThinkingResponse = {
	title: string;
	slug: string;
	sections: ({ fieldId: 'section' } & Section)[];
	meta?: ({ fieldId: "meta" } & Meta);
	tag?: Tag;
} & MicroCMSListContent;
