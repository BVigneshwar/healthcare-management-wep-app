import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {getAjax} from './Utilities';
import AnnouncementComponent from './AnnouncementComponent';
import AppointmentComponent from './AppointmentComponent';
import RecordComponent from './RecordComponent';

class HomepageComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading : true,
			user : undefined
		}
	}
	
	componentDidMount(){
		getAjax("/api/details", (response) => {
			this.setState({loading : false, user : response});
		});
	}
	
	render(){
		if(this.state.loading){
			return <div>Loading</div>;
		}
		var content;
		if(this.props.match.params && this.props.match.params.tab){
			switch(this.props.match.params.tab){
				case "announcement":
					content = <AnnouncementComponent id={this.state.user.id} role={this.state.user.role} />;
					break;
				case "appointment":
					content = <AppointmentComponent id={this.state.user.id} role={this.state.user.role} create={true} />;
					break;
				case "record":
					content = <RecordComponent id={this.state.user.id} role={this.state.user.role} />;
					break;
			}
		}
		return (<>
			<div>
				<h3>{this.state.user.name}</h3>
				<div>{this.state.user.phone}</div>
				<div>{this.state.user.role}</div>
				<div>{this.state.user.blood_group}</div>
			</div>
			<Link to="/homepage/appointment">Appointment</Link>
			<Link to="/homepage/record">Record</Link>
			<Link to="/homepage/announcement">Announcement</Link>
			{content}
		</>);
	}
}

var HomepageComponentWithRouter = withRouter(HomepageComponent);

export default HomepageComponentWithRouter;