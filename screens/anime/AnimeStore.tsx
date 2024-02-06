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
	page: number;
	setFilterParams: (props: FilterParams) => void;
	setQuery: (props: { query: string }) => void;
	setPage: (props: { page: number }) => void;
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
	page: 1,
	setQuery: (by) =>
		set(() => ({
			query: by.query,
		})),
	setPage: (by) =>
		set(() => ({
			page: by.page,
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
