const initialState = {
	heroes: [],
	heroesLoadingStatus: 'idle',
	filters: [],
	currentFilter: 'all'

}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case 'HEROES_FETCHING':
			return {
				...state,
				heroesLoadingStatus: 'loading'
			}
		case 'HEROES_FETCHED':
			return {
				...state,
				heroes: action.payload,
				heroesLoadingStatus: 'idle',
			}
		case 'HEROES_FETCHING_ERROR':
			return {
				...state,
				heroesLoadingStatus: 'error'
			}
		case 'HERO_DELETE':
			return {
				...state,
				heroes: state.heroes.filter(hero => hero.id !== action.payload.id)
			}
		case 'HERO_ADD':
			return {
				...state,
				heroes: [...state.heroes, action.payload],
			}
		case 'HERO_GET_FILTER':
			return {
				...state,
				filters: [...action.payload]
			}
		case 'HERO_FILTER':
			return {
				...state,
				currentFilter: action.payload,
				filters: state.filters.map(f => f.filter === action.payload ? { ...f, active: true } : { ...f, active: false })

			}

		default: return state
	}
}

export default reducer;