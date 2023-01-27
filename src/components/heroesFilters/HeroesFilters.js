import { useEffect } from "react";
import { createSelector } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uid } from "uuid";

// import { activeFilterChanged } from './filtersSlice';
import { fetchedFiltersAsync, selectAll, activeFilterChanged } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import classNames from "classnames";

const HeroesFilters = () => {

	const filterSelector = createSelector(
		(state) => state.filters.currentFilter,
		selectAll,
		(filter, arr) => {
			return arr.map(f =>
				f.filter === filter ? { ...f, active: true } : { ...f, active: false })
		}
	)
	const filters = useSelector(filterSelector)

	const filtersLoadingStatus = useSelector((state) => {
		return state.filters.filtersLoadingStatus
	})
	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchedFiltersAsync())
		// eslint-disable-next-line 
	}, [])
	if (filtersLoadingStatus === "loading") {
		return <Spinner />;
	} else if (filtersLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const createFilters = (arr) => {
		if (arr.length === 0) {
			return;
		}
		const filters = arr.map(({ filter, active, generalClasses, label }) => {
			const classes = classNames(generalClasses, { "active": active })
			return <button
				key={uid()}
				onClick={() => dispatch(activeFilterChanged(filter))}
				className={classes}>{label}</button>
		})
		return filters;
	}
	// console.log(filters);
	const elements = createFilters(filters);

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					{elements}
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;