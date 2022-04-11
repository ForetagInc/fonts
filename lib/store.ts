import Zustand from 'zustand';
import { persist } from 'zustand/middleware';

export const useStore = Zustand(persist(
	(set, get) => ({
		content: 'Almost before we knew it, we had left the ground.',
		fontSize: 40,
		updateContent: (newContent: string) => set({ content: newContent })
	}),
	{
		name: 'persist',
		getStorage: () => localStorage
	}
));