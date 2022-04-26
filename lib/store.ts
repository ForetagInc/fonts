import Zustand from 'zustand';
import { persist } from 'zustand/middleware';

interface IStore {
	isDark: boolean;
	isSelectBarOpen: boolean;

	content: string;
	fontSize: number;

	selectedFonts: Array<{
		family: string;
		weight: number;
	}>;

	toInitialState: () => void;
	toggleTheme: () => void;
	toggleSelectBar: () => void;
	setFontSize: (fontSize: string) => void;
	updateContent: (newString: string) => void;
	addSelectedFont: (family: string, weight: number) => void;
};

let initialState = {
	isDark: typeof window !== 'undefined' ?
		window.matchMedia('(prefers-color-scheme: dark)').matches : false,

	isSelectBarOpen: false,

	content: 'Almost before we knew it, we had left the ground.',
	fontSize: 40,

	selectedFonts: [],
};

export const useStore = Zustand<IStore>(persist(
	(set, get) => ({
		...initialState,

		/* Actions */
		toInitialState: () => set({ ...initialState }),
		toggleTheme: () => set({ isDark: !get().isDark }),
		toggleSelectBar: () => set({ isSelectBarOpen: !get().isSelectBarOpen }),
		setFontSize: (fontSize: string) => {
			let font = parseInt(fontSize);
			if (font <= 300
				&& font >= 8) set({ fontSize: font })
			else
				set({ fontSize: initialState.fontSize })
		},
		updateContent: (newContent: string) => set({ content: newContent }),
		addSelectedFont: (family: string, weight: number) =>
			set({ selectedFonts: [...get().selectedFonts, { family, weight }] }),
	}),
	{
		name: 'fonts',
		getStorage: () => localStorage,
	}
));