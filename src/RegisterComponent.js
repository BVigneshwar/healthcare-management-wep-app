import React from 'react';

import {TextComponent, NumericComponent, PasswordComponent, DatePickerComponent, RadioButtonComponent, ButtonComponent, SelectComponent, ErrorComponent} from'./InputComponents';
import {postAjax, formatDate} from './Utilities';

class RegisterComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			name : "",
			phone : "",
			password : "",
			confirm_password : "",
			role : "user",
			dob : formatDate(new Date()),
			gender : "",
			blood_group : undefined,
			error : undefined
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleChange(event){
		var obj = {};
		if(event.target.name === "dob"){
			obj[event.target.name] = formatDate(new Date(event.target.value));
		}else{
			obj[event.target.name] = event.target.value;
		}
		if(this.state.error && this.state.error.fields.includes(event.target.name)){
			obj.error = undefined;
		}
		this.setState(obj);
	}
	
	validate(){
		if(!this.state.name || this.state.name.length === 0){
			this.handleError(["name"], "Name should not be empty");
			return false;
		}
		if(!this.state.phone || this.state.phone.length === 0){
			this.handleError(["phone"], "Phone should not be empty");
			return false;
		}
		if(!this.state.password || this.state.password.length === 0){
			this.handleError(["password"], "Password should not be empty");
			return false;
		}
		if(!this.state.confirm_password || this.state.confirm_password.length === 0){
			this.handleError(["confirm_password"], "Re-Password should not be empty");
			return false;
		}
		if(this.state.password !== this.state.confirm_password){
			this.handleError(["password", "confirm_password"], "Re-Password should be same as Password");
			return false;
		}
		if(!this.state.dob || new Date(this.state.dob) > new Date()){
			this.handleError(["dob"], "Date of birth should not be greater than current date");
			return false;
		}
		if(!this.state.gender || this.state.gender.length === 0){
			this.handleError(["gender"], "Gender should not be empty");
			return false;
		}
		if(!this.state.blood_group){
			this.handleError(["blood_group"], "Select blood group");
			return false;
		}
	}
	
	handleError(fields, msg){
		this.setState({error : {fields : fields, msg : msg}});
	}
	
	handleClick(event){
		if(event.target.name === "register"){
			if(!this.validate()){
				return;
			}
			var obj = {date_of_joining : formatDate(new Date())};
			var {state, error} = this.state;
			Object.assign(obj, state);
			postAjax("/api/register", obj, function(response){
				window.location.href = "http://localhost:3000/";
			});
		}
	}
	
	render(){
		var gender_data = [
			{id : "male", value : "Male", label : "Male"},
			{id : "female", value : "Female", label : "Female"}
		];
		var blood_options = [
			{name : "A+", value : "A+"},
			{name : "A-", value : "A-"},
			{name : "B+", value : "B+"},
			{name : "B-", value : "B-"},
			{name : "O+", value : "O+"},
			{name : "O-", value : "O-"},
			{name : "AB+", value : "AB+"},
			{name : "AB-", value : "AB-"}
		]
		return (
			<div>
				<ErrorComponent error={this.state.error}/>
				<TextComponent id="name" label="Name" name="name" value={this.state.name} handleChange={this.handleChange} />
				<NumericComponent id="phone-number" label="Phone" name="phone" value={this.state.phone} handleChange={this.handleChange} />
				<PasswordComponent id="password" label="Password" name="password" value={this.state.password} handleChange={this.handleChange} />
				<PasswordComponent id="confirm-password" label="Re-Password" name="confirm_password" value={this.state.confirm_password} handleChange={this.handleChange} />
				<DatePickerComponent id="dob" label="Date of Birth" name="dob" value={this.state.dob} handleChange={this.handleChange} />
				<RadioButtonComponent label="Gender" name="gender" data={gender_data} value={this.state.gender} handleChange={this.handleChange} />
				<SelectComponent id="blood_group" name="blood_group" label="Blood Group" placeholder="--Select Blood Group--" options={blood_options} value={this.state.blood_group} handleChange={this.handleChange} />
				<ButtonComponent label="Register" name="register" handleClick={this.handleClick} />
			</div>
		);
	}
}

export default RegisterComponent;