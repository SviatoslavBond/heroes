export const heroesFetching = () => {
	return {
		type: 'HEROES_FETCHING'
	}
}

export const heroesFetched = (heroes) => {
	return {
		type: 'HEROES_FETCHED',
		payload: heroes
	}
}

export const heroesFetchingError = () => {
	return {
		type: 'HEROES_FETCHING_ERROR'
	}
}
export const heroDelete = (hero) => {
	return {
		type: 'HERO_DELETE',
		payload: hero
	}
}
export const heroAdd = (hero) => {
	return {
		type: 'HERO_ADD',
		payload: hero
	}
}
export const heroGetFilters = (filters) => {
	return {
		type: 'HERO_GET_FILTER',
		payload: filters
	}
}
export const heroFilter = (filter) => {

	return {
		type: 'HERO_FILTER',
		payload: filter
	}
}