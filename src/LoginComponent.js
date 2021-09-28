import React from 'react';
import { Link } from 'react-router-dom';

import {NumericComponent, PasswordComponent, ButtonComponent} from'./InputComponents';
import {postAjax, getAjax} from './Utilities';

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
			window.location.href = "http://localhost:3000/homepage";
		});
	}
	
	render(){
		return (
			<div className="login-container popup-container white-bg absolute-center">
				<h3 className="center-align">LOGIN</h3>
				<NumericComponent id="phone-number" label="Phone" name="phone" value={this.state.phone} handleChange={this.handleChange} />
				<PasswordComponent id="password" label="Password" name="password" value={this.state.password} handleChange={this.handleChange} />
				<ButtonComponent label="Login" className="active-button" handleClick={this.handleClick} />
				<div className="center-align">---------- OR ----------</div>
				<ButtonComponent label={<Link to="/register">Register</Link>} className="inactive-button"/>
			</div>
		);
	}
}

export default LoginComponent;