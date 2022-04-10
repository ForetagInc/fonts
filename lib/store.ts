import Zustand from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = Zustand(persist(
	(set, get) => ({
		fontSources: {},
		content: 'Almost before we knew it, we had left the ground.',
		fontSize: 40,
		updatefontSources: (newSource: object) => set({ fontSources: newSource }),
		updateContent: (newContent: string) => set({ content: newContent })
	}),
	{
		name: 'persist',
		getStorage: () => localStorage
	}
));