import React from 'react';

import {TextComponent, ButtonComponent, DatePickerComponent, SelectComponent, ErrorComponent, PopupComponent} from './InputComponents';
import {getAjax, postAjax, formatDate} from './Utilities';

class AppointmentComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading : true,
			appointments : [],
			popup : false
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	fetchAppointments(){
		getAjax("/api/"+this.props.role+"/"+this.props.id+"/appointment", (response) => {
			this.setState({loading : false, appointments :response});
		});
	}
	
	handleClick(event){
		if(event.target.name === "create_appointment"){
			this.setState({popup : true});
		}
	}
	
	handleClose(event){
		this.setState({loading : true, popup : false});
	}
	
	componentDidMount(){
		this.fetchAppointments();
	}
	
	componentDidUpdate(){
		if(this.props.loading === true){
			this.fetchAppointments();
		}
	}
	
	render(){
		if(this.state.loading){
			return <div>Loading</div>;
		}
		var appointments = "No Appointments";
		if(this.state.appointments){
			appointments = this.state.appointments.map(function(appointment){
				return (
					<div key={appointment.id} className="appointment-container">
						<h3>{appointment.doctor.name}</h3>
						<div>{appointment.doctor.speciality}</div>
						<div>{appointment.doctor.gender}</div>
						<div>{appointment.doctor.phone}</div>
						<div>{appointment.symptoms}</div>
						<div>{appointment.date + " " + appointment.time}</div>
					</div>
				)
			});
		}
		return (<>
			<h3>Appointment</h3>
			{ this.props.create && <ButtonComponent label="Create Appointment" name="create_appointment" handleClick={this.handleClick}/> }
			{ appointments }
			{ this.state.popup && <AppointmentFormComponent id={this.props.id} role={this.props.role} handleClose={this.handleClose}/> }
		</>);
	}
}

class AppointmentFormComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			symptoms : "",
			doctor : undefined,
			date : formatDate(new Date()),
			time : "",
			error : undefined,
			doctor_options : [],
			time_slot : undefined
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	fetchDoctors(){
		getAjax("/api/"+this.props.role+"/"+this.props.id+"/doctor", (response) => {
			var options = response.map(function(res){
				return {name : res.name, value : res.id, speciality : res.speciality};
			});
			this.setState({doctor_options : options});
		});
	}
	
	fetchSlots(){
		getAjax("/api/"+this.props.role+"/"+this.props.id+"/doctor/"+this.state.doctor+"/slot?date="+this.state.date, (response) => {
			var options = response.map(function(res){
				return {name : res.time, value : res.time};
			});
			this.setState({time_slot : options});
		});
	}
	
	componentDidMount(){
		this.fetchDoctors();
	}
	
	handleChange(event){
		var obj = {};
		if(event.target.name === "date"){
			obj[event.target.name] = formatDate(new Date(event.target.value));
		}else{
			obj[event.target.name] = event.target.value;
		}
		if(this.state.error && this.state.error.fields.includes(event.target.name)){
			obj.error = undefined;
		}
		if((event.target.name === "doctor" && this.state.date) || (event.target.name === "date" && this.state.doctor.length > 0)){
			this.fetchSlots();
		}
		this.setState(obj);
	}
	
	validate(){
		if(!this.state.doctor || this.state.doctor.length === 0){
			this.handleError(["doctor"], "Select a doctor");
			return false;
		}
		if(!this.state.symptoms || this.state.symptoms.length === 0){
			this.handleError(["symptoms"], "Symptoms should not be empty");
			return false;
		}
		if(!this.state.date || new Date(this.state.date) < new Date()){
			this.handleError(["date"], "Date should not be less than current date");
			return false;
		}
		if(!this.state.time || this.state.time.length === 0){
			this.handleError(["time"], "Select a time");
			return false;
		}
	}
	
	handleError(fields, msg){
		this.setState({error : {fields : fields, msg : msg}});
	}
	
	handleClick(event){
		if(event.target.name === "create"){
			if(!this.validate()){
				return;
			}
			var obj = {};
			var {state, error} = this.state;
			Object.assign(obj, state);
			postAjax("/api/"+this.props.role+"/"+this.props.id+"/appointment", obj, function(response){
				this.props.handleClose();
			});
		}
	}
	
	render(){
		return (
			<PopupComponent>
				<div>
					<ErrorComponent error={this.state.error}/>
					<TextComponent id="symptoms" label="Symptoms" name="symptoms" value={this.state.symptoms} handleChange={this.handleChange} />
					<SelectComponent id="doctor" name="doctor" label="Doctor" placeholder="--Select Doctor--" options={this.state.doctor_options} value={this.state.doctor} handleChange={this.handleChange} />
					<DatePickerComponent id="date" label="Date" name="date" value={this.state.date} handleChange={this.handleChange} />
					<SelectComponent id="time" name="time" label="Time" placeholder="--Select Time--" options={typeof this.state.time_slot === 'undefined' ? [] : this.state.time_slot} disabled={typeof this.state.time_slot === 'undefined'} value={this.state.time} handleChange={this.handleChange} />
					<ButtonComponent label="Create" name="create" handleClick={this.handleClick} />
				</div>
			</PopupComponent>
		);
	}
}

export default AppointmentComponent;