import type { Contents } from './contents';
export type Section = {
	title: string;
	contents: (
		| ({
				fieldId: 'contents';
		  } & Contents)
		| ({
				fieldId: 'section';
		  } & Section)
	)[];
};
