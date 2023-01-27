import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";

const heroesAdapter = createEntityAdapter();

const initialState = heroesAdapter.getInitialState({
	heroesLoadingStatus: 'idle'
})


export const fetchHeroesAsync = createAsyncThunk(
	'heroes/fetchHeroes',
	() => {
		const { request } = useHttp();
		return request("http://localhost:3001/heroes")
	}
)

export const deleteHeroByID = createAsyncThunk(
	'heroes/deleteHeroByID',
	(id) => {
		const { request } = useHttp();
		return request(`http://localhost:3001/heroes/${id}`, 'DELETE')
	}
)

const heroesSlice = createSlice(
	{
		name: 'heroes',
		initialState,
		reducers: {
			heroAdd(state, action) {
				heroesAdapter.addOne(state, action.payload)
			},
			heroDelete(state, action) {
				state.heroes = state.heroes.filter(hero => hero.id !== action.payload);
			}
		},
		extraReducers: (builder) => {
			builder
				.addCase(fetchHeroesAsync.pending, (state) => { state.heroesLoadingStatus = 'loading' })
				.addCase(fetchHeroesAsync.fulfilled, (state, action) => {
					state.heroesLoadingStatus = 'idle'
					heroesAdapter.setAll(state, action.payload)
				})
				.addCase(fetchHeroesAsync.rejected, state => { state.heroesLoadingStatus = 'error' })
				.addCase(deleteHeroByID.fulfilled, (state, action) => {
					heroesAdapter.removeOne(state, action.meta.arg)
				})
				.addCase(deleteHeroByID.rejected, (state) => { state.heroesLoadingStatus = 'error' })
				.addDefaultCase(() => { })
		}
	}
)



const { actions, reducer } = heroesSlice
export default reducer;
export const { heroAdd, heroDelete } = actions;
export const { selectAll } = heroesAdapter.getSelectors(state => state.heroes)
