import React from 'react';

class TextComponent extends React.PureComponent{
	render(){
		return (
			<div className={this.props.containerClass}>
				<label htmlFor={this.props.id}>{this.props.label}</label>
				<input id={this.props.id} className={this.props.className} type="text" name={this.props.name} value={this.props.value} onChange={this.props.handleChange}/>
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

export {TextComponent, PasswordComponent, DatePickerComponent, ButtonComponent};