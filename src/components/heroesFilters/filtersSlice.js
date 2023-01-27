import { createAsyncThunk, createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";


const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
	currentFilter: 'all',
	filtersLoadingStatus: 'idle'
})

export const fetchedFiltersAsync = createAsyncThunk(
	'filters/fetchedFilters',
	() => {
		const { request } = useHttp();
		return request('http://localhost:3001/filters')
	}
)

const filtersSlice = createSlice(
	{
		name: 'filters',
		initialState,
		reducers: {
			activeFilterChanged: function (state, action) {
				state.currentFilter = action.payload
			}
		},
		extraReducers: (builder) => {
			builder
				.addCase(fetchedFiltersAsync.pending, (state) => { state.filtersLoadingStatus = 'loading' })
				.addCase(fetchedFiltersAsync.fulfilled, (state, action) => {
					state.filtersLoadingStatus = 'idle'
					filtersAdapter.setAll(state, action.payload)
					// state.filters = action.payload
				})
				.addCase(fetchedFiltersAsync.rejected, (state) => { state.filtersLoadingStatus = 'error' })
				.addDefaultCase(() => { })
		}
	}
)
const { actions, reducer } = filtersSlice;
export default reducer;
export const {
	activeFilterChanged
} = actions;
export const { selectAll } = filtersAdapter.getSelectors(state => state.filters)