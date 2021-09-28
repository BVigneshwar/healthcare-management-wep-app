import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import {getAjax} from './Utilities';
import AnnouncementComponent from './AnnouncementComponent';
import AppointmentComponent from './AppointmentComponent';
import RecordComponent from './RecordComponent';
import TaskComponent from './TaskComponent';

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
		var tabs, content;
		var tab_config = [
			{ id : "announcement", url : "/homepage/announcement", label : "Announcement", roles : ["user", "doctor"] },
			{ id : "appointment", url : "/homepage/appointment", label : "Appointment", roles : ["user", "doctor"] },
			{ id : "record", url : "/homepage/record", label : "Record", roles : ["user"] },
			{ id : "task", url : "/homepage/user", label : "Task", roles : ["doctor"] }
		];
		tabs = tab_config.filter((tab) => tab.roles.includes(this.state.user.role)).map((tab) => {
			return <Link key={tab.id} to={tab.url} className={this.props.match.params && this.props.match.params.tab === tab.id ? "selected" : ""}>{tab.label}</Link>;
		});
		if(this.state.user.role === "user"){
			if(this.props.match.params && this.props.match.params.tab){
				switch(this.props.match.params.tab){
					case "announcement":
						content = <AnnouncementComponent id={this.state.user.user_id} role={this.state.user.role} />;
						break;
					case "appointment":
						content = <AppointmentComponent id={this.state.user.user_id} role={this.state.user.role} />;
						break;
					case "record":
						content = <RecordComponent id={this.state.user.user_id} role={this.state.user.role} />;
						break;
				}
			}
		}else if(this.state.user.role === "doctor"){
			if(this.props.match.params && this.props.match.params.tab){
				switch(this.props.match.params.tab){
					case "announcement":
						content = <AnnouncementComponent id={this.state.user.id} role={this.state.user.role} />;
						break;
					case "appointment":
						content = <AppointmentComponent id={this.state.user.id} role={this.state.user.role} />;
						break;
					case "task":
						content = <TaskComponent id={this.state.user.id} role={this.state.user.role} />
				}
			}
		}
		
		return (<>
			<div className="user-profile-container white-bg">
				<div className="user-details-container">
					<h3 className="profile-name">{this.state.user.name}</h3>
					<div className="profile-gender">{this.state.user.gender}</div>
					<div className="profile-phone">{this.state.user.phone}</div>
				</div>
				<div className="profile-blood-group">{this.state.user.blood_group}</div>
			</div>
			<div className="homepage-tabs-container white-bg">{tabs}</div>
			{content}
		</>);
	}
}

var HomepageComponentWithRouter = withRouter(HomepageComponent);

export default HomepageComponentWithRouter;