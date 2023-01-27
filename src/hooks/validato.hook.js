import { useState } from "react";

export const useValid = () => {
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

	return {
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
	}

}