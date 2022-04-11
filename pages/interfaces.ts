type IFontType = 'Mono' | 'Sans Serif';

export interface IFont {
	id: string;
	family: string;
	category: string;
	weights: number[];
	styles: string[];
}