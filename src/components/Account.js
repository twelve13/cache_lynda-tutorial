import React, { Component } from "react";
import AddWithdrawalForm from "./AddWithdrawalForm";
import AddDepositForm from "./AddDepositForm";
import EditAccountForm from "./EditAccountForm";
import * as api from "../api";

//CRUD step 5: pass form props down

class Account extends Component {
	state = {
		currentAmountOfAccount: this.props.current_amount,
		enoughFunds: true
	};

	goToLog = () => {
		this.props.goToLogPage(this.props.name);
	};

	editAccount = (editedAccount) => {
		this.props.editAccount(this.props.name, editedAccount);
		this.setState({
        	currentAmountOfAccount: editedAccount.current_amount
      })
	};

  updateCurrentAmountwithWithdrawalAmount = (newWithdrawal) => {
  	if(this.props.current_amount >= newWithdrawal.amount){
      this.setState({
        currentAmountOfAccount: this.props.current_amount - newWithdrawal.amount
      })
  	}
  	else {
  		this.setState({
  			enoughFunds: false
  		})
  	}
  }

  updateCurrentAmountwithDepositAmount = (newDeposit) => {
      this.setState({
        currentAmountOfAccount: this.props.current_amount + newDeposit.amount
      })
  };


	render() {
		
		const addTheWithdrawal = (addToThisAccount, newWithdrawal) => {
			//subtract the withdrawal amount from the account's current amount
  		    this.updateCurrentAmountwithWithdrawalAmount(newWithdrawal),
  		    //and also add this withdrawal as an item to the account's list of withdrawals
  		    this.props.addWithdrawal(addToThisAccount, newWithdrawal);
  		};

  		const addTheDeposit = (addToThisAccount, newDeposit) => {
			//add the deposit amount to the account's current amount
  		    this.updateCurrentAmountwithDepositAmount(newDeposit),
  		    //and also add this deposit as an item to the account's list of deposits
  		    this.props.addDeposit(addToThisAccount, newDeposit);
  		};

		return (
			<div className="account">
				<div className="account__name">{this.props.name}</div>
				<div className="account__current-amount">${this.state.currentAmountOfAccount}</div>
				<div className="account__suggested-amount">Suggested: {this.props.suggested}</div>
				<div className="account__notes">Notes: {this.props.notes}</div>
				<div className="account__deposits">
					<div>Deposits</div>
					<AddDepositForm addDeposit = {addTheDeposit} parentAccount = {this.props.name} setIncomingSource = {this.props.setIncomingSource}/>
				</div>
				<div className="account__withdrawals">
					<div>Withdrawals</div>
					<AddWithdrawalForm addWithdrawal = {addTheWithdrawal} parentAccount = {this.props.name}/>
				</div>
				<div className="account__log" onClick = {this.goToLog}>Log</div>
				<EditAccountForm editAccount={this.editAccount} />
				<div className={this.state.enoughFunds? "enough-funds" : "insufficient-funds"}>Not enough funds!</div>
			</div>
		);
	}
}


export default Account;