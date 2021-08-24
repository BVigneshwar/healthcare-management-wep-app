import React from 'react';
import ReactDOM from 'react-dom';
import SelectSearch, {fuzzySearch} from 'react-select-search';

class TextComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="text" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
				<div>{this.props.error}</div>
			</div>
		);
	}
}

class NumericComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="number" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
				<div>{this.props.error}</div>
			</div>
		);
	}
}

class PasswordComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="password" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
				<div>{this.props.error}</div>
			</div>
		);
	}
}

class DatePickerComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="date" name={this.props.name} value={this.props.value} onChange={this.props.handleChange} />
				<div>{this.props.error}</div>
			</div>
		);
	}
}

class RadioButtonComponent extends React.PureComponent{
	render(){
		var radioElem = this.props.data.map((data, index) => {
			return (
				<React.Fragment key={index}>
					<input type="radio" id={data.id} name={this.props.name} value={data.value} checked={data.value === this.props.value} onChange={this.props.handleChange}/>
					<label htmlFor={data.id}>{data.label}</label>
				</React.Fragment>
			);
		});
		return(
			<div>
				<label>{this.props.label}</label>
				{radioElem}
				<div>{this.props.error}</div>
			</div>
		);
	}
}

class ButtonComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<button id={this.props.id} className={this.props.className} name={this.props.name} onClick={this.props.handleClick}>{this.props.label}</button>
			</div>
		);
	}
}

class SelectComponent extends React.Component{
	constructor(props){
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}
	
	handleChange(val){
		this.props.handleChange({
			target : {
				name : this.props.name,
				value : val
			}
		});
	}
	
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<SelectSearch id={this.props.id} className={this.props.className} name={this.props.name} placeholder={this.props.placeholder} options={this.props.options} search filterOptions={fuzzySearch} value={this.props.value} disabled={this.props.disabled} onChange={this.handleChange}/>
			</div>
		)
	}
}

class ErrorComponent extends React.Component{
	render(){
		if(this.props.error && this.props.error.msg){
			return <div>{this.props.error.msg}</div>;
		}else{
			return null;
		}
	}
}

var popupContainer = document.getElementById("popup-container");

class PopupComponent extends React.Component{
	constructor(props){
		super(props);
		this.el = document.createElement('div');
	}
	
	componentDidMount(){
		popupContainer.appendChild(this.el);
	}
	
	componentWillUnmount(){
		popupContainer.removeChild(this.el);
	}
	
	render(){
		var popup = <div>{this.props.children}</div>;
		return ReactDOM.createPortal( popup, this.el);
	}
}

export {TextComponent, NumericComponent, PasswordComponent, DatePickerComponent, RadioButtonComponent, ButtonComponent, SelectComponent, ErrorComponent, PopupComponent};