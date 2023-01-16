import { useState, useEffect } from "react";
import { v4 as uid } from "uuid";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroAdd } from '../../actions';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
	const [filters, setFilters] = useState([]);
	const [heroName, setHeroName] = useState('');
	const [heroDescribe, setHeroDescribe] = useState('');
	const [heroSuperpower, setHeroSuperpower] = useState('');
	const [nameDirty, setNameDirty] = useState(false);
	const [describeDirty, setDescribeDirty] = useState(false);
	const [superPowerDirty, setSuperPowerDirty] = useState(false);
	const [errorName, setErrorName] = useState('This field is required');
	const [errorDescribe, setErrorDescribe] = useState('This field is required');
	const [errorPower, setErrorPower] = useState('This field is required');
	const [formValid, setFormValid] = useState(false);
	const { request } = useHttp();
	const dispatch = useDispatch();


	useEffect(() => {
		request("http://localhost:3001/filters")
			.then(filters => setFilters(filters))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (errorName || errorDescribe || errorPower) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
	}, [errorName, errorDescribe, errorPower])

	const blurHandler = (e) => {
		switch (e.target.name) {
			case 'name':
				setNameDirty(true);
				break;
			case 'text':
				setDescribeDirty(true);
				break;
			case 'element':
				setSuperPowerDirty(true);
				break;
			default:
		}
	}

	const submitHandler = (e) => {
		e.preventDefault();

		if (heroName && heroDescribe && heroSuperpower) {
			const hero = {
				id: uid(),
				name: heroName,
				description: heroDescribe,
				element: heroSuperpower
			};
			const json = JSON.stringify(hero);

			request("http://localhost:3001/heroes", 'POST', json)
				.then(hero => dispatch(heroAdd(hero)))
				.then(() => setToInitialStateOfForm())
		}
	}
	const setToInitialStateOfForm = () => {
		setHeroName('');
		setHeroDescribe('');
		setHeroSuperpower('');
		setDescribeDirty(false);
		setSuperPowerDirty(false);
		setNameDirty(false);
		setErrorName('This field is required');
		setErrorDescribe('This field is required');
		setErrorPower('This field is required');
	}

	const changeHandler = (e) => {
		// eslint-disable-next-line default-case
		switch (e.target.name) {
			case 'name':
				if (e.target.value.length < 5) {
					setErrorName('Name must have min 5 symbols')
				} else {
					setErrorName(false)
				}
				setHeroName(e.target.value)
				break;
			case 'text':
				if (e.target.value.length < 5) {
					setErrorDescribe('Description your hero must have min 5 symbols')
				} else {
					setErrorDescribe(false)
				}
				setHeroDescribe(e.target.value);
				break;
			case 'element':
				if (e.target.value !== 'Я владею элементом...') {
					setErrorPower(false);
				}
				setHeroSuperpower(e.target.value)
				break;
		}
	}

	return (
		<form onSubmit={(e) => submitHandler(e)} className="border p-4 shadow-lg rounded">
			<div className="mb-3">
				<label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
				<input
					onChange={(e) => changeHandler(e)}
					onBlur={(e) => blurHandler(e)}
					value={heroName}
					type="text"
					name="name"
					className="form-control"
					id="name"
					placeholder="Как меня зовут?" />
				{(nameDirty && errorName) && <div className="text-danger">{errorName}</div>}
			</div>

			<div className="mb-3">
				<label htmlFor="text" className="form-label fs-4">Описание</label>
				<textarea
					onChange={(e) => changeHandler(e)}
					onBlur={(e) => blurHandler(e)}
					value={heroDescribe}
					name="text"
					className="form-control"
					id="text"
					placeholder="Что я умею?"
					style={{ "height": '130px' }} />
				{(describeDirty && errorDescribe) && <div className="text-danger">{errorDescribe}</div>}
			</div>

			<div className="mb-3">
				<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
				<select
					value={heroSuperpower}
					onChange={(e) => changeHandler(e)}
					onBlur={(e) => blurHandler(e)}
					className="form-select"
					id="element"
					name="element">
					<option >Я владею элементом...</option>
					{filters.map(f => {
						// eslint-disable-next-line default-case
						switch (f) {
							case 'fire':
								return <option key={uid()} value="fire">Огонь</option>
							case 'water':
								return <option key={uid()} value="water">Вода</option>
							case 'wind':
								return <option key={uid()} value="wind">Ветер</option>
							case 'earth':
								return <option key={uid()} value="earth">Земля</option>
						}
					})}
				</select>
				{(superPowerDirty && errorPower) && <div className="text-danger"> {errorPower}</div>}
			</div>

			<button disabled={!formValid} type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;