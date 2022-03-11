import React from 'react';
import Calendar from 'react-calendar';
import './Calendar.css'
// import 'react-calendar/dist/Calendar.css'; <- Old CSS file
import dayjs from 'dayjs';

const DateCalendar = ({
	errors,
	validated,
	available,
	booked,
	regionBooked,
	success,
	selectedDate,
	setSelectedDate,
}) => {
	return (
		<div className='calendarAlign disableCalendar'>
			<div className={validated && !!errors.date ? 'invalidCalendar' : ''}> {/*Control validation formatting*/}
				<Calendar
					onChange={setSelectedDate}
					value={selectedDate}
					maxDate={new Date(dayjs().add(11, 'month').endOf('month').toDate())}
					minDate={new Date()}
					next2Label=''
					prev2Label=''
					minDetail='year'
					showNeighboringMonth='false'
					tileClassName={({ date, view }) => { {/*Conditional formatting*/}
						if (dayjs(date).format('DD/MM/YYYY') === dayjs(selectedDate).format('DD/MM/YYYY')) {
							return 'selected';

						} else if (available.includes(dayjs(date).format('DD/MM/YYYY'))) {
							return 'available';

						} else if (booked.includes(dayjs(date).format('DD/MM/YYYY'))) {
							return 'booked';

						} else if (regionBooked.includes(dayjs(date).format('DD/MM/YYYY'))) {
							return 'regionBooked';

						} else if (date > new Date()) {
							return 'unavailable';
                            
						} else {
							return 'past';
						}
					}}
					tileDisabled={({ date, view }) => { {/*Conditional disabling of dates*/}
						if (success && dayjs(date).format('DD/MM/YYYY') !== dayjs(selectedDate).format('DD/MM/YYYY')) {
							return true;

						} else {
							if (available.includes(dayjs(date).format('DD/MM/YYYY'))) {
								return false;
                                
							} else {
								return true;
							}
						}
					}}
				/>
			</div>
			<span className='invalidText'>{errors.date}</span>
		</div>
	);
};

export default DateCalendar;
