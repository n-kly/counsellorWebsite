import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormPage from './components/FormPage/FormPage';
import AdminPage from './components/AdminPage/AdminPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Sidebar from './components/Sidebar';

function App() {
	return (
		<>
			<BrowserRouter>
				<Sidebar />
				<Switch>
					<Route path='/' exact component={FormPage} />
					<Route path='/admin' exact component={AdminPage} />
				</Switch>
			</BrowserRouter>
		</>
	);
}

export default App;
