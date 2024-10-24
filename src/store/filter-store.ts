import { create } from 'zustand';

interface FiltersState {
	filters: string[];
	range: [number, number];
	addFilter: (filter: string) => void;
	removeFilter: (filter: string) => void;
	clearFilters: () => void;
	setRange: (range: [number, number]) => void;
	setFilters: (filters: string[]) => void;
}

export const useFiltersStore = create<FiltersState>((set) => ({
	filters: [],
	range: [0, 4],

	addFilter: (filter) => set((state) => ({ filters: [...state.filters, filter] })),

	removeFilter: (filter) =>
		set((state) => ({
			filters: state.filters.filter((item) => item !== filter),
		})),

	clearFilters: () =>
		set({
			filters: [],
			range: [0, 4],
		}),

	setRange: (newRange) => set({ range: newRange }),

	setFilters: (newFilters) => set({ filters: newFilters }),
}));
