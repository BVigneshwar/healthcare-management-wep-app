import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import {TextComponent, PasswordComponent, DatePickerComponent, ButtonComponent} from'./Components';
import {postAjax, getAjax, formatDate} from './Utilities';

class App extends React.Component{
	render(){
		return (
			<Router>
				<Switch>
					<Route exact path="/">
						<LoginComponent/>
					</Route>
					<Route path="/register">
						<RegisterComponent/>
					</Route>
					<Route path="/dashboard">
						<h1>Dashboard</h1>
					</Route>
				</Switch>
			</Router>
		);
	}
}

class LoginComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			phone : "",
			password : ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleChange(event){
		this.setState({[event.target.name] : event.target.value});
	}
	
	handleClick(event){
		postAjax("/api/login", this.state, function(response){
			window.location.href = "http://localhost:3000/dashboard";
		});
	}
	
	render(){
		return (
			<div>
				<TextComponent id="phone-number" label="Phone" name="phone" value={this.state.phone} handleChange={this.handleChange} />
				<PasswordComponent id="password" label="Password" name="password" value={this.state.password} handleChange={this.handleChange} />
				<ButtonComponent label="Login" handleClick={this.handleClick} />
				<ButtonComponent label={<Link to="/register">Register</Link>} />
			</div>
		);
	}
}

class RegisterComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name : "",
			phone : "",
			password : "",
			confirm_password : "",
			designation : "patient",
			dob : formatDate(new Date())
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleChange(event){
		if(event.target.name == "dob"){
			this.setState({[event.target.name] : formatDate(new Date(event.target.value))});
		}else{
			this.setState({[event.target.name] : event.target.value});
		}
	}
	
	handleClick(event){
		if(event.target.name == "register"){
			var obj = {date_of_joining : formatDate(new Date())};
			Object.assign(obj, this.state);
			postAjax("/api/register", obj, function(response){
				window.location.href = "http://localhost:3000/";
			});
		}
	}
	
	render(){
		return (
			<div>
				<TextComponent id="name" label="Name" name="name" value={this.state.name} handleChange={this.handleChange} />
				<TextComponent id="phone-number" label="Phone" name="phone" value={this.state.phone} handleChange={this.handleChange} />
				<PasswordComponent id="password" label="Password" name="password" value={this.state.password} handleChange={this.handleChange} />
				<PasswordComponent id="confirm-password" label="Re-Password" name="confirm_password" value={this.state.confirm_password} handleChange={this.handleChange} />
				<DatePickerComponent id="dob" label="Date of Birth" name="dob" value={this.state.dob} handleChange={this.handleChange} />
				<ButtonComponent label="Register" name="register" handleClick={this.handleClick} />
			</div>
		);
	}
}

export default App;
