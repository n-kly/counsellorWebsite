// Client side-routing for serving web pages by rendering components

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './components/FormPage/FormPage';
import EditBookings from './components/AdminPage/bookings/EditBookings';
import EditCalendar from './components/AdminPage/calendar/EditCalendar';
import EditEmail from './components/AdminPage/emails/EditEmail';
import Support from './components/Support';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';
import PrivateRoute from './PrivateRoute';

function App() {
	const [admin, setAdmin] = useState(false)
	return (
		<>
			<BrowserRouter>
				<Sidebar2 admin={admin} setAdmin={setAdmin}/>
				<Switch>
					<Route path='/' exact component={FormPage} />
					<Route path='/support' exact component={Support} />
					
					{/*Private routes are blocked until admin access is granted*/}
					<PrivateRoute admin={admin} path='/admin/booking' exact component={EditBookings} /> 
					<PrivateRoute admin={admin} path='/admin/calendar' exact component={EditCalendar} />
					<PrivateRoute admin={admin} path='/admin/emails' exact component={EditEmail} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
