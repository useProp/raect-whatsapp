import { useEffect, useState } from 'react';

const PREFIX = 'whats-app';

const UseLocalStorage = (key, initialValue) => {
	const prefixKey = `${PREFIX}-${key}`;

	console.log(key, initialValue)

	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixKey);
		if (jsonValue) {
			console.log(jsonValue,  )
			return JSON.parse(jsonValue);
		}

		if (typeof initialValue === 'function') {
			return initialValue();
		}

		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(prefixKey, JSON.stringify(value));
	}, [value, prefixKey]);

	return [value, setValue];
};

export default UseLocalStorage;