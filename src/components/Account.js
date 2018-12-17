import React, { Component } from "react";
import AddWithdrawalForm from "./AddWithdrawalForm";
import * as api from "../api";

class Account extends Component {
	goToLog = () => {
		this.props.onAccountClick(this.props.name);
	}


	render() {
		
		const addTheWithdrawal = (addToThisAccount, newWithdrawal) => {
  		    this.props.addWithdrawal(addToThisAccount, newWithdrawal)
  		};

		return (
			<div className="account">
				<div className="account__name">{this.props.name}</div>
				<div className="account__current-amount">${this.props.current_amount}</div>
				<div className="account__suggested-amount">Suggested: {this.props.suggested}</div>
				<div className="account__notes">Notes: {this.props.notes}</div>
				<div className="account__withdrawals">
					<div>Withdrawals</div>
					<AddWithdrawalForm addWithdrawal = {addTheWithdrawal} parentAccount = {this.props.name}/>
				</div>
				<div className="account__log" onClick = {this.goToLog}>Log</div>
			</div>
		);
	}
}


export default Account;