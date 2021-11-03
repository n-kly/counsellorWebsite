export default function validateCouns(counsInfo) {
    let errors = {};
    const regex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (counsInfo.name === '' || counsInfo.name === 'Name') {
		errors.name = 'University name required';
	}

    if (counsInfo.counsEmail === '' || counsInfo.counsEmail === 'Email') {
		errors.counsEmail = 'Email required';
	
    } else if (!regex.test(counsInfo.counsEmail)) {
		errors.counsEmail = 'Invalid email';
	}

    return errors
}