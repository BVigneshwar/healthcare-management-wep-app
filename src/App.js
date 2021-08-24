import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import LoginComponent from './LoginComponent';
import RegisterComponent from './RegisterComponent';
import HomepageComponent from './HomepageComponent';

class App extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route path="/login">
						<LoginComponent/>
					</Route>
					<Route path="/register">
						<RegisterComponent/>
					</Route>
					<Route path="/homepage/:tab">
						<HomepageComponent/>
					</Route>
					<Route path="/homepage">
						<HomepageComponent/>
					</Route>
					<Route exact path="/">
						<LoginComponent/>
					</Route>
				</Switch>
			</Router>
		);
	}
}

export default App;
