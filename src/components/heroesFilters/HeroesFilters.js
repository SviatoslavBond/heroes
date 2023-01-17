import { useEffect } from "react";
import { v4 as uid } from "uuid";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch, useSelector } from 'react-redux';
import { heroGetFilters, heroFilter, heroesFetchingError } from '../../actions';

import classNames from "classnames";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
	const filters = useSelector(state => state.filters);
	const dispatch = useDispatch();
	const { request } = useHttp();

	useEffect(() => {
		request('http://localhost:3001/filters')
			.then(data => dispatch(heroGetFilters(data)))
			.catch(() => dispatch(heroesFetchingError()))
		// eslint-disable-next-line 
	}, [])


	const createFilters = (arr) => {
		if (arr.length === 0) {
			return;
		}
		const filters = arr.map(({ filter, active, generalClasses, label }) => {
			const classes = classNames(generalClasses, { "active": active })
			return <button
				key={uid()}
				onClick={() => dispatch(heroFilter(filter))}
				className={classes}>{label}</button>
		})
		return filters;
	}
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