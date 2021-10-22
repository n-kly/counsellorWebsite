import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './components/FormPage/FormPage';
import EditBookings from './components/AdminPage/bookings/EditBookings';
import EditCalendar from './components/AdminPage/calendar/EditCalendar';
import EditEmail from './components/AdminPage/emails/EditEmail';
import Support from './components/Support';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar2 from './components/Sidebar2';


function App() {
	return (
		<>
			<BrowserRouter>
				<Sidebar2/>
				<Switch>
					<Route path='/' exact component={FormPage} />
					<Route path='/admin/booking' exact component={EditBookings} />
					<Route path='/admin/calendar' exact component={EditCalendar} />
					<Route path='/admin/emails' exact component={EditEmail} />
					<Route path='/support' exact component={Support} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
