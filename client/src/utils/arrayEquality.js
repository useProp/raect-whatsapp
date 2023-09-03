export const arrayEquality = (arr1, arr2) => {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let item of arr1) {
		if (!arr2.includes(item)) {
			return false;
		}
	}

	return true;
}