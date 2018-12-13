import React, { Component } from "react";
import AddWithdrawalForm from "./AddWithdrawalForm";
import * as api from "../api";

class Account extends Component {
	goToLog = () => {
		this.props.onAccountClick(this.props.name);
	}

  	addWithdrawalFunction = (newWithdrawal) => {
  		var name = this.props.name;
    	api.addWithdrawal(name, newWithdrawal)
  	};


	render() {
		return (
			<div className="account">
				<div className="account__name">{this.props.name}</div>
				<div className="account__current-amount">${this.props.current_amount}</div>
				<div className="account__suggested-amount">Suggested: {this.props.suggested}</div>
				<div className="account__notes">Notes: {this.props.notes}</div>
				<AddWithdrawalForm addWithdrawal = {this.addWithdrawalFunction}/>
				<div className="account__log" onClick = {this.goToLog}>Log</div>
			</div>
		);
	}
}


export default Account;