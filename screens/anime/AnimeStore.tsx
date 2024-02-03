import { create } from 'zustand';

interface FilterParams {
	type: string;
	status: string;
	rating: string;
	orderBy: string;
	sort: string;
}
interface AnimeState {
	filterParams: FilterParams;
	query: string;
	setFilterParams: (props: FilterParams) => void;
	setQuery: (props: { query: string }) => void;
	resetFilter: () => void;
}
const initialState = {
	filterParams: {
		orderBy: '',
		rating: '',
		sort: '',
		status: '',
		type: '',
	},
	query: '',
};
const useAnimeStore = create<AnimeState>()((set) => ({
	filterParams: initialState.filterParams,
	query: initialState.query,
	setQuery: (by) =>
		set(() => ({
			query: by.query,
		})),
	setFilterParams: (by) =>
		set(() => ({
			filterParams: {
				orderBy: by.orderBy,
				rating: by.rating,
				sort: by.sort,
				status: by.status,
				type: by.type,
			},
		})),
	resetFilter: () =>
		set(() => ({
			filterParams: initialState.filterParams,
		})),
}));

export default useAnimeStore;
