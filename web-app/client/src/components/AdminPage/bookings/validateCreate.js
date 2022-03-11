export default function validateInfo(bookingData,date) {
	console.log(bookingData)
	let errors = {};
	const regex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (isNaN(Date.parse(date))) {
		errors.date = 'Invalid Date';
	}
	if (bookingData.uniName === '' || bookingData.uniName === 'University Name') {
		errors.uniName = 'University name required';
	}
	if (bookingData.uniRepName === '' || bookingData.uniRepName === 'Rep Name') {
		errors.uniRepName = 'Name required';
	}
    if (bookingData.uniRepJobTitle === '' || bookingData.uniRepJobTitle === 'Rep Title') {
		errors.uniRepJobTitle = 'Job title required';
	}
    if (bookingData.uniRepEmail === '' || bookingData.uniRepEmail === 'Rep Email') {
		errors.uniRepEmail = 'Email required';
	
    } else if (!regex.test(bookingData.uniRepEmail)) {
		errors.uniRepEmail = 'Invalid email';
	}
    if (bookingData.uniRegion === '' || bookingData.uniRegion === 'University Region') {
		errors.uniRegion = 'Region required';
	}

	console.log(errors)
	return errors;
}
