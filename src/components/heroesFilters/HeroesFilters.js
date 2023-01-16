import { useState, useEffect } from "react";
import { v4 as uid } from "uuid";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroFilter } from "../../actions";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

	const dispatch = useDispatch();

	return (
		<div className="card shadow-lg mt-4">
			<div className="card-body">
				<p className="card-text">Отфильтруйте героев по элементам</p>
				<div className="btn-group">
					<button onClick={() => dispatch(heroFilter('all'))} className="btn btn-outline-dark active">Все</button>
					<button onClick={() => dispatch(heroFilter('fire'))} className="btn btn-danger">Огонь</button>
					<button onClick={() => dispatch(heroFilter('water'))} className="btn btn-primary">Вода</button>
					<button onClick={() => dispatch(heroFilter('wind'))} className="btn btn-success">Ветер</button>
					<button onClick={() => dispatch(heroFilter('earth'))} className="btn btn-secondary">Земля</button>
				</div>
			</div>
		</div>
	)
}

export default HeroesFilters;