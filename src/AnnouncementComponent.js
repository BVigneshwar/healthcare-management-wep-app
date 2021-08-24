import React from 'react';

import {ButtonComponent} from './InputComponents';
import {getAjax} from './Utilities';

class AnnouncementComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading : true,
			announcements : []
		};
		this.handleClick = this.handleClick.bind(this);
	}
	
	handleClick(event){
		if(event.target.name === "create_announcement"){
			
		}
	}
	
	componentDidMount(){
		getAjax("/api/"+this.props.role+"/"+this.props.id+"/announcement", (response) => {
			this.setState({loading : false, announcements :response});
		});
	}
	
	render(){
		if(this.state.loading){
			return <div>Loading</div>;
		}
		var announcements = "No Announcements";
		if(this.state.announcements){
			announcements = this.state.announcements.map(function(announcement){
				return (
					<div key={announcement.id} className="announcement-container">
						<h3>{announcement.title}</h3>
						<div>{announcement.description}</div>
						<div>{announcement.created_by}</div>
						<div>{announcement.created_date + " " + announcement.created_time}</div>
					</div>
				)
			});
		}
		return (<>
			<h3>Annoucement</h3>
			{ this.props.create && <ButtonComponent label="Create Annoucement" name="create_announcement" handleClick={this.handleClick}/> }
			{ announcements }
		</>);
	}
}

export default AnnouncementComponent;