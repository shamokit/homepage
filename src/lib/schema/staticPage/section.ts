import type { Content } from './content';
import type { Histories } from './history';
import type { Table } from './table';
export type Section = {
	fieldId: 'section';
	title?: string;
	toggle?: boolean;
	body: (
		| ({ fieldId: 'content' } & Content)
		| ({ fieldId: 'histories' } & Histories)
		| ({ fieldId: 'table' } & Table)
		| Section
	)[];
};
