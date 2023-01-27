import { useEffect } from "react";
import { v4 as uid } from "uuid";
import { useHttp } from '../../hooks/http.hook';
import { useDispatch } from 'react-redux';
import { heroAdd } from '../heroesList/heroSlice';
import { useSelector } from "react-redux";
import { useValid } from "../../hooks/validato.hook";
import { selectAll } from "../heroesFilters/filtersSlice";


const HeroesAddForm = () => {
	const filters = useSelector(selectAll)
	const {
		setFormValid,
		blurHandler,
		setToInitialStateOfForm,
		changeHandler,
		heroName,
		heroDescribe,
		heroSuperpower,
		nameDirty,
		describeDirty,
		superPowerDirty,
		errorName,
		errorDescribe,
		errorPower,
		formValid
	} = useValid()
	const { request } = useHttp();
	const dispatch = useDispatch();

	useEffect(() => {
		if (errorName || errorDescribe || errorPower) {
			setFormValid(false);
		} else {
			setFormValid(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [errorName, errorDescribe, errorPower])

	const submitHandler = (e) => {
		e.preventDefault();
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
					{filters.map(({ label, filter }) => {
						if (filter === 'all') {
							// eslint-disable-next-line array-callback-return
							return;
						}
						return <option key={uid()} value={filter}>{label}</option>
					})}
				</select>
				{(superPowerDirty && errorPower) && <div className="text-danger"> {errorPower}</div>}
			</div>

			<button disabled={!formValid} type="submit" className="btn btn-primary">Создать</button>
		</form>
	)
}

export default HeroesAddForm;