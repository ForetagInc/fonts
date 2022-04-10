type IFontType = 'Mono' | 'Sans Serif';

export interface IFont {
	id: string;
	family: string;
	category: string;
	weights: number[];
	styles: string[];

	name: string,
	package: string,
	by: string[],
	version: number,
	type: Array<IFontType>;
	defaultVariant: {
		style: string,
		weight: number
	};
}