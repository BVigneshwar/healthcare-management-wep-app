import React from 'react';

import {getAjax} from './Utilities';

class RecordComponent extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			loading : true,
			records : []
		};
	}
	
	componentDidMount(){
		getAjax("/api/"+this.props.role+"/"+this.props.id+"/record", (response) => {
			this.setState({loading : false, records :response});
		});
	}
	
	render(){
		if(this.state.loading){
			return <div>Loading</div>;
		}
		var records = "No Records";
		if(this.state.records){
			records = this.state.records.map(function(record){
				return (
					<div key={record.id} className="record-container">
						<h3>{record.diagnosis}</h3>
						<div>{record.doctor.name}</div>
						<div>{record.doctor.speciality}</div>
						{
							record.prescription && record.prescription.map(function(data){
								return (<div>
									<div>{data.medicine}</div>
									<div>{data.description}</div>
									<div>{data.duration} {data.duration_unit}</div>
									{data.morning && <div>Morning</div>}
									{data.evening && <div>Evening</div>}
									{data.night && <div>Night</div>}
									{data.before_meal && <div>Before Meal</div>}
									{data.after_meal && <div>After Meal</div>}
								</div>);
							})
						}
						<div>{record.created_date + " " + record.created_time}</div>
					</div>
				)
			});
		}
		return (<div className="record-container homepage-container white-bg">
			<div className="record-header homepage-header">
				<h3>Record</h3>
			</div>
			<div className="homepage-list record-list">{ records }</div>
		</div>);
	}
}

export default RecordComponent;