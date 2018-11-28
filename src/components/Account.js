import React, { Component } from "react";

class Account extends Component {
	goToLog = () => {
		this.props.onClick(this.props.name);
	}

	render() {
		return (
			<div className="account">
				<div className="account__name">{this.props.name}</div>
				<div className="account__current-amount">${this.props.current_amount}</div>
				<div className="account__suggested-amount">Suggested: {this.props.suggested}</div>
				<div className="account__notes">Notes: {this.props.notes}</div>
				<div className="account__log" onClick = {this.goToLog}>Log</div>
			</div>
		);
	}
}


export default Account;