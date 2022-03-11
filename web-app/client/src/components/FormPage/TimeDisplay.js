// Simple time display component

import React from 'react';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isToday from 'dayjs/plugin/isToday';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(isToday);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(advancedFormat);

const TimeDisplay = ({ date }) => {
	let aptDate = dayjs(date).utc().hour(13).minute(30).second(0); // Sets date to predetermined appointment time
	let visible = dayjs(date).format('DD/MM/YYYY') === dayjs(new Date()).format('DD/MM/YYYY'); // Checks if a date has been selected

	return ( // A lot of the code here is just formatting
		<div className='timeBox'>
			<h1 className='timeTitle'>Your appointment is at</h1>
			<div className='localTime'>
				<h1 className='localTimeTitle'>Local time</h1>
				{visible ? dayjs(aptDate).local().format('h:mm A') : dayjs(aptDate).local().format('MMMM D, h:mm A')}
				<br />
				{'GMT' + dayjs(aptDate).local().format('Z (z)')}
			</div>
			<br />

			<div className='ourTime'>
				<h1 className='ourTimeTitle'>Our time</h1>
				{visible ? dayjs(aptDate).tz('America/Chicago').format('h:mm A') : dayjs(aptDate).tz('America/Chicago').format('MMMM D, h:mm A')}
				<br />
				{'GMT' + dayjs(aptDate).tz('America/Chicago').format('Z (z)')}
			</div>
		</div>
	);
};

export default TimeDisplay;
