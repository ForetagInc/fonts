type IFontType = 'Mono' | 'Sans Serif';

export interface IFont {
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