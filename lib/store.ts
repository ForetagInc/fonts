import Zustand from 'zustand';

export const useStore = Zustand(set => ({
	content: 'Almost before we knew it, we had left the ground.',
	fontSize: 40
}));