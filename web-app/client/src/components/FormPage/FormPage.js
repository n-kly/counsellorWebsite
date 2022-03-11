// Main form page, a sort of hub for many components to mount to and render from

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import TextForm from './TextForm';
import TimeDisplay from './TimeDisplay';
import DateCalendar from './DateCalendar';
import axios from 'axios';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import validateInfo from './validateForm';

dayjs.extend(isBetween);

// Initialize calendar states
let available = [];
let booked = [];
let regionBooked = [];

function FormPage() {
	let calendarData;

	const [checkDate, setCheckDate] = useState(false); // Used to manually re-render after validation
	const [key, setKey] = useState(false); // Used to manually re-render after validation

	const [validated, setValidated] = useState(false); // Used to prevent validation tooltips from appearing before submission
	const [error, setError] = useState({}); // Array of validation errors
	const [success, setSuccess] = useState(false); 
	const [dateData, setDateData] = useState(new Date()); // Store appointment date
	const [formData, setFormData] = useState({ // Store booking information
		uniName: '',
		uniRepName: '',
		uniRepJobTitle: '',
		uniRepEmail: '',
		uniRegion: '',
	});


	// Submission handler
	const handleSubmit = (e) => { 
		e.preventDefault();

		const bookingDateInfoInstance = {
			aptDate: dateData,
			status: 'Booked',
			booking: {
				uniName: formData.uniName,
				uniRepName: formData.uniRepName,
				uniRepJobTitle: formData.uniRepJobTitle,
				uniRepEmail: formData.uniRepEmail,
				uniRegion: formData.uniRegion,
			},};

		setCheckDate(!checkDate); // Manually re-render before submission to trigger validation
		if (Object.keys(validateInfo(bookingDateInfoInstance)).length === 0) {
			localStorage.setItem('lastDate', new Date()) 
			setSuccess(true); // Lock input fields 
			axios.post('http://localhost:5000/booking/create', bookingDateInfoInstance);

		} else {
			setError(validateInfo(bookingDateInfoInstance));
			setValidated(true); // Trigger validation styles
		}
	};
	
	useEffect(()=>{
		let lastDate = localStorage.getItem('lastDate')
		if(dayjs(lastDate).isAfter(dayjs(new Date()).subtract(3, 'month'))){
			setSuccess(true);
		} 
	}, [])

	// eslint-disable-next-line
	useEffect(async () => {
		if (formData.uniRegion !== '') { // Prevent render on mount
			async function getRegionData() { // Async to prevent stalling 
				let response = await axios.get('http://localhost:5000/booking/readforform');
				return response;
			}

			// eslint-disable-next-line
			calendarData = (await getRegionData()).data;

			available = [];
			booked = [];
			regionBooked = [];

			// console.log(instance.booking.uniRegion)
			console.log(calendarData)

			calendarData.forEach((instance, index) => { 
				if (instance.status === "Booked" && instance.booking.uniRegion === formData.uniRegion) {
					booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'));

					// Lower bound of the week
					let lowB = dayjs(instance.aptDate) 
						.add(7, 'day')
						.format('DD/MM/YYYY');

					// Upper bound of the week
					let uppB = dayjs(instance.aptDate) 
						.subtract(7, 'day')
						.format('DD/MM/YYYY');

					if (index - 1 >= 0) {
						// Checks last available day
						if (calendarData[index - 1].status === 'Available' && dayjs(calendarData[index - 1])
						.isBetween(lowB,uppB,null,'[]')) { 
							regionBooked.push(dayjs(calendarData[index - 1].aptDate).format('DD/MM/YYYY'));
							calendarData[index - 1].status = 'Region booked'; // Prevent further formatting 
						}
					}

					if (index + 1 <= calendarData.length - 1) {
						// Checks next available day
						if (calendarData[index + 1].status === 'Available' && dayjs(calendarData[index + 1])
						.isBetween(lowB,uppB,null,'[]')) { 
							regionBooked.push(dayjs(calendarData[index + 1].aptDate).format('DD/MM/YYYY'));
							calendarData[index + 1].status = 'Region booked';
						}
					}
				}
			});
			
			calendarData.forEach((instance) => { 
				if (instance.status === 'Available') {
					available.push(dayjs(instance.aptDate).format('DD/MM/YYYY'));
				
				} else if (instance.status === 'Booked') {
					booked.push(dayjs(instance.aptDate).format('DD/MM/YYYY'));
				}
			});

			// Deselect current date if it became booked/region booked during selection
			if (booked.includes(dayjs(dateData).format('DD/MM/YYYY')) || regionBooked.includes(dayjs(dateData).format('DD/MM/YYYY'))) { 
				setDateData(new Date());
			}

			setKey(!key); // Manually re-render
		}
	}, [formData.uniRegion, checkDate]); // Dependencies which, after change, will trigger the useEffect


	return (
		<div className='container'>
			<div className='row align-items-center'>
				<div className='col-6'>
					<TextForm
						validated={validated}
						errors={error}
						isReadOnly={success}
						formData={formData}
						setFormData={setFormData}
					/>
				</div>
				<div className='col-6'>
					<DateCalendar
						validated={validated}
						errors={error}
						available={available}
						booked={booked}
						regionBooked={regionBooked}
						success={success}
						selectedDate={dateData}
						setSelectedDate={setDateData}
					/>
				</div>
			</div>
			<div className='row align-items-center'>
				<div className='col-6'>
					<TimeDisplay date={dateData} />
				</div>
				
				<div className='col-6'>
					<div className='submitAlign'>
						<Button
							className={success ? 'disabled button' : 'button'}
							as='input'
							type='submit'
							value='Submit'
							onClick={handleSubmit}
						/>
					</div>
				</div>
			</div>
			<h5 
				id='successSubmit'
				className={success ? 'alert-success' : 'hidden'}>
				Thank you for signing up for the BISH virtual presentation, you
				will receive an email shortly with the details of your booking.
			</h5>
		</div>
	);
}

export default FormPage;
