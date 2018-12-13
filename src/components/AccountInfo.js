import React, {Component} from "react";
import Item from "./Item";
import App from "./App";

class AccountInfo extends Component {
	render() {

		//a new account gets created without withdrawals or deposits so have to specify something here, an empty array, or else can't map on undefined
		const withdrawals = (this.props.withdrawals? this.props.withdrawals: [])
		const withdrawalsList = withdrawals.map(withdrawal => <Item key={withdrawal._id} name={withdrawal.name} amount={withdrawal.amount} date={withdrawal.date} />)

		const deposits = (this.props.deposits? this.props.deposits : [])
		const depositsList = deposits.map(deposit => <Item key={deposit._id} name={deposit.name} amount={deposit.amount} date={deposit.date} />)

  		const removeAccount = () => {
  			this.props.removeAccount(this.props.name)
  		};
  	


		return (
			<div className="account-info">
				<div className="account-info__name">
					{this.props.name}
				</div>
				<div className="link" onClick={this.props.accountListClick}>
					Return to home
				</div>
				<div onClick={removeAccount}>Remove this account</div>
			
			<div className="account-info__section">
				<div className="account-info__section--title">Withdrawals</div>
				<div>Name Amount Date</div>
				<div>{withdrawalsList}</div>
			</div>
			<div>
				<div>Deposits</div>
				<div>{depositsList}</div>
			</div>


			</div>
		)
	}
}

export default AccountInfo;


	