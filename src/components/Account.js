import React, { Component } from "react";

class Account extends Component {
	handleClick = () => {
		this.props.onClick(this.props.id);
	}

	render() {
		return (
			<div className="account" onClick = {this.handleClick}>
				<div className="account-name">{this.props.name}</div>
				<div>Suggested: {this.props.suggested}</div>
				<div>Notes: {this.props.notes}</div>
			</div>
		);
	}
}


export default Account;