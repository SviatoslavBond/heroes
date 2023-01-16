import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
	const { heroes, heroesLoadingStatus, filters } = useSelector(state => state);
	const dispatch = useDispatch();
	const { request } = useHttp();
	// console.log(heroes);
	useEffect(() => {
		dispatch(heroesFetching());
		request("http://localhost:3001/heroes")
			.then(data => dispatch(heroesFetched(data)))
			.catch(() => dispatch(heroesFetchingError()))

		request('https://63c5b712f80fabd877eeb8e9.mockapi.io/api/heroes/heroes')
			.then((data) => console.log(data))
		// eslint-disable-next-line
	}, []);

	if (heroesLoadingStatus === "loading") {
		return <Spinner />;
	} else if (heroesLoadingStatus === "error") {
		return <h5 className="text-center mt-5">Ошибка загрузки</h5>
	}

	const renderHeroesList = (arr) => {
		if (arr.length === 0) {
			return [];
		}
		let findHero = false;
		const heroElements = arr.map((hero) => {
			if (hero.element === filters) {
				findHero = true;
				return <HeroesListItem key={hero.id} id={hero.id} hero={hero} />
			}
			if (filters === 'all') {
				findHero = true;
				return <HeroesListItem key={hero.id} id={hero.id} hero={hero} />
			}
		})
		return findHero ? heroElements : []
	}

	const elements = renderHeroesList(heroes);
	console.log(elements.length);
	return (
		<ul>
			{elements.length === 0 ? <h5 className="text-center mt-5">Героев пока нет</h5> : elements}
		</ul>
	)
}

export default HeroesList;