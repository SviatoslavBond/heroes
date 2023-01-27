
import { configureStore } from '@reduxjs/toolkit';
// import { combineReducers } from 'redux';

import heroes from '../components/heroesList/heroSlice';
import filters from '../components/heroesFilters/filtersSlice';

const stringMiddleware = (store) => (next) => (action) => {
	if (typeof action === 'string') {
		return next({ type: action })
	}
	return next(action);
}

// const store = createStore(
// 	combineReducers({ filters, heroes }),
// 	compose(applyMiddleware(ReduxThunk, stringMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()),
// );
// const roootReducers = combineReducers({ heroes, filters });
// console.log(roootReducers);
const store = configureStore({
	// reducer: roootReducers,
	reducer: { heroes, filters },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(stringMiddleware),
	devTools: process.env.NODE_ENV !== 'production',


})
export default store;