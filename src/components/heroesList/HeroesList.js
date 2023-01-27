import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { createSelector } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { fetchHeroesAsync, selectAll } from './heroSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


const HeroesList = () => {
	const heroesSelector = createSelector(
		(state) => state.filters.currentFilter,
		selectAll,
		(filter, heroes) => {
			if (filter === 'all') {
				return heroes
			} else {
				return heroes.filter(hero => hero.element === filter)
			}
		}
	)
	const filtered = useSelector(heroesSelector);

	const heroesLoadingStatus = useSelector((state) => {
		return state.heroes.heroesLoadingStatus
	});


	const dispatch = useDispatch();


	useEffect(() => {
		dispatch(fetchHeroesAsync());

		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}


	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return <h5 className="text-center mt-5">Героев пока нет</h5>
		}
		return arr.map(hero => {
			return <HeroesListItem key={hero.id} id={hero.id} hero={hero} />
		})
	}

	const elements = renderHeroesList(filtered);
	return (
		<>
			<ul>
				{elements}
			</ul>
		</>

	)
}

export default HeroesList;

