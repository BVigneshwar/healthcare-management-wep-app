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
		if(this.state.loading === true){
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
					<div key={appointment.id} className="homepage-entry-wrapper appointment-wrapper">
						{ appointment.doctor &&
							<div className="appointment-doctor-container">
								<div className="width-50">
									<h3 className="appointment-doctor-name inline-middle">{appointment.doctor.name}</h3>
									<div className="separator">|</div>
									<span className="appointment-doctor-speciality inline-middle">{appointment.doctor.speciality}</span>
									<div className="separator">|</div>
									<div className="appointment-doctor-gender inline-middle">{appointment.doctor.gender}</div>
								</div>
								<div className="width-50 right-align"><span>{appointment.doctor.phone}</span></div>
							</div>
						}
						{ appointment.user && <>
							<h3>{appointment.user.name}</h3>
							<div>{appointment.user.gender}</div>
							<div>{appointment.user.phone}</div>
						</>}
						<div className="appointment-symptoms">{appointment.symptoms}</div>
						<div className="appointment-date"><span className="homepage-label">Date : </span>{appointment.date + " " + appointment.time}</div>
					</div>
				)
			});
		}
		return (<div className="appointment-container homepage-container white-bg">
			<div className="appointment-header homepage-header">
				<h3>Appointment</h3>
				{ this.props.role === "user" && <>
					<div className="separator">|</div>
					<ButtonComponent label="Create Appointment" name="create_appointment"  containerClass="homepage-button-container" className="homepage-button" handleClick={this.handleClick}/>
				</>}
			</div>
			<div className="homepage-list appointment-list">{ appointments }</div>
			{ this.state.popup && <AppointmentFormComponent id={this.props.id} role={this.props.role} handleClose={this.handleClose}/> }
		</div>);
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
		this.handleClick = this.handleClick.bind(this);
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
		}else if(event.target.name === "cancel"){
			this.props.handleClose();
		}
	}
	
	render(){
		return (
			<PopupComponent>
					<h3 className="center-align">APPOINTMENT</h3>
					<ErrorComponent error={this.state.error}/>
					<TextComponent id="symptoms" label="Symptoms" name="symptoms" value={this.state.symptoms} handleChange={this.handleChange} />
					<SelectComponent id="doctor" name="doctor" label="Doctor" placeholder="--Select Doctor--" options={this.state.doctor_options} value={this.state.doctor} handleChange={this.handleChange} />
					<DatePickerComponent id="date" label="Date" name="date" value={this.state.date} handleChange={this.handleChange} />
					<SelectComponent id="time" name="time" label="Time" placeholder="--Select Time--" options={typeof this.state.time_slot === 'undefined' ? [] : this.state.time_slot} disabled={typeof this.state.time_slot === 'undefined'} value={this.state.time} handleChange={this.handleChange} />
					<ButtonComponent label="Create" name="create" className="active-button" containerClass="button-50-container center-align" handleClick={this.handleClick} />
					<ButtonComponent label="Cancel" name="cancel" className="inactive-button" containerClass="button-50-container center-align" handleClick={this.handleClick} />
			</PopupComponent>
		);
	}
}

export default AppointmentComponent;