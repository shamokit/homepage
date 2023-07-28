export type History = {
	fieldId: 'history';
	day: string;
	content: string;
};
export type Histories = {
	fieldId: 'histories';
	history: History[];
};
