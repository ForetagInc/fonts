import Zustand from 'zustand';
import { persist } from 'zustand/middleware';

interface IStore {
	mode: 'light' | 'dark';
	content: string;
	fontSize: number;
	updateContent: (newContent: string) => void;
};

export const useStore = Zustand<IStore>(persist(
	(set, get) => ({
		mode: 'light',
		content: 'Almost before we knew it, we had left the ground.',
		fontSize: 40,
		updateContent: (newContent: string) => set({ content: newContent })
	}),
	{
		name: 'persist',
		getStorage: () => localStorage
	}
));