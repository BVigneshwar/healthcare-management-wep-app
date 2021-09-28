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
					<div key={announcement.id} className="homepage-entry-wrapper announcement-wrapper">
						<h3 className="announcement-title">{announcement.title}</h3>
						<div className="announcement-description">{announcement.description}</div>
						<div className="announcement-author-container">
							<div className="announcement-created_by"><span className="homepage-label">Author : </span><span>{announcement.created_by}</span></div>
							<div className="announcement-date"><span className="homepage-label">Date : </span><span>{announcement.created_date + " " + announcement.created_time}</span></div>
						</div>
					</div>
				)
			});
		}
		return (<div className="announcement-container homepage-container white-bg">
			<div className="announcement-header homepage-header">
				<h3>Annoucement</h3>
				{ this.props.create && <ButtonComponent label="Create Annoucement" name="create_announcement" handleClick={this.handleClick}/> }
			</div>
			<div className="homepage-list announcement-list">{ announcements }</div>
		</div>);
	}
}

export default AnnouncementComponent;