import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './components/FormPage/FormPage';
import EditBookings from './components/AdminPage/bookings/EditBookings';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Sidebar from './components/Sidebar';
import Sidebar2 from './components/Sidebar2';

function App() {
	return (
		<>
			<BrowserRouter>
				{/* <Sidebar /> */}
				<Sidebar2/>
				<Switch>
					<Route path='/' exact component={FormPage} />
					<Route path='/admin/booking' exact component={EditBookings} />
					<Route path='/admin/calendar' exact component={EditBookings} />
					<Route path='/admin/emails' exact component={EditBookings} />
					<Route path='/support' exact component={EditBookings} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
