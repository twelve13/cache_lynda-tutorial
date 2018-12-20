import React, { Component } from "react";
import AddWithdrawalForm from "./AddWithdrawalForm";
import * as api from "../api";

class Account extends Component {
	state = {currentAmountOfAccount: this.props.current_amount};

	goToLog = () => {
		this.props.onAccountClick(this.props.name);
	}

  updateCurrentAmountwithWithdrawalAmount = (newWithdrawal) => {
      this.setState({
        currentAmountOfAccount: this.props.current_amount - newWithdrawal.amount
      })
  };

	render() {
		
		const addTheWithdrawal = (addToThisAccount, newWithdrawal) => {
			//subtract the withdrawal amount from the account's current amount
  		    this.updateCurrentAmountwithWithdrawalAmount(newWithdrawal),
  		    //and also add this withdrawal as an item to the account's list of withdrawals
  		    this.props.addWithdrawal(addToThisAccount, newWithdrawal);
  		};

		return (
			<div className="account">
				<div className="account__name">{this.props.name}</div>
				<div className="account__current-amount">${this.state.currentAmountOfAccount}</div>
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