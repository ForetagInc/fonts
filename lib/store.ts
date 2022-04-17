import Zustand from 'zustand';
import { persist } from 'zustand/middleware';

interface IStore {
	isDark: boolean;
	content: string;
	fontSize: number;

	selectedFonts: Array<{
		family: string;
		weight: number;
	}>;

	toggleTheme: () => void;
	updateContent: (newString: string) => void;
	addSelectedFont: (family: string, weight: number) => void;
};

export const useStore = Zustand<IStore>(persist(
	(set, get) => ({
		isDark: typeof window !== 'undefined' ?
			window.matchMedia('(prefers-color-scheme: dark)').matches : false,

		content: 'Almost before we knew it, we had left the ground.',
		fontSize: 40,

		selectedFonts: [],

		/* Actions */
		toggleTheme: () => set({ isDark: !get().isDark }),
		updateContent: (newContent: string) => set({ content: newContent }),
		addSelectedFont: (family: string, weight: number) =>
			set({ selectedFonts: [...get().selectedFonts, { family, weight }] }),
	}),
	{
		name: 'fonts',
		getStorage: () => localStorage,
	}
));