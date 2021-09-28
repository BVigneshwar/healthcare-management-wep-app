import React from 'react';
import ReactDOM from 'react-dom';
import SelectSearch, {fuzzySearch} from 'react-select-search';

class TextComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass ? this.props.containerClass : "input-text-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="text" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
			</div>
		);
	}
}

class NumericComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass ? this.props.containerClass : "input-number-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="number" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
			</div>
		);
	}
}

class PasswordComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass ? this.props.containerClass : "input-password-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="password" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
			</div>
		);
	}
}

class TextAreaComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass ? this.props.containerClass : "input-textarea-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<textarea id={this.props.id} className={this.props.className} name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
			</div>
		);
	}
}

class DatePickerComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass ? this.props.containerClass : "input-date-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="date" name={this.props.name} value={this.props.value} onChange={this.props.handleChange} />
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
					<label htmlFor={data.id} className="radio-label">{data.label}</label>
				</React.Fragment>
			);
		});
		return(
			<div className={this.props.containerClass ? this.props.containerClass : "input-radio-container"}>
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
			<div className={this.props.containerClass ? this.props.containerClass : "button-container"}>
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
			<div className={this.props.containerClass ? this.props.containerClass : "select-container"}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<SelectSearch id={this.props.id} className={this.props.className} name={this.props.name} placeholder={this.props.placeholder} options={this.props.options} search filterOptions={fuzzySearch} value={this.props.value} disabled={this.props.disabled} onChange={this.handleChange} onBlur={function(){ debugger; }}/>
			</div>
		)
	}
}

class ErrorComponent extends React.Component{
	render(){
		if(this.props.error && this.props.error.msg){
			return <div className="error-container center-align">{this.props.error.msg}</div>;
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
		this.el.classList.add('popup-wrapper');
	}
	
	componentDidMount(){
		popupContainer.appendChild(this.el);
	}
	
	componentWillUnmount(){
		popupContainer.removeChild(this.el);
	}
	
	render(){
		var popup = (<>
				<div className="popup-mask"></div>
				<div className="popup-container absolute-center white-bg">{this.props.children}</div>
			</>);
		return ReactDOM.createPortal( popup, this.el);
	}
}

export {TextComponent, NumericComponent, PasswordComponent, TextAreaComponent, DatePickerComponent, RadioButtonComponent, ButtonComponent, SelectComponent, ErrorComponent, PopupComponent};