import React, {Component} from "react";
import Item from "./Item";

class AccountInfo extends Component {
	render() {
		const withdrawals = (this.props.withdrawals)
		const withdrawalsList = withdrawals.map(withdrawal => <Item key={withdrawal._id} name={withdrawal.name} amount={withdrawal.amount} date={withdrawal.date} />)

		const deposits = (this.props.deposits)
		const depositsList = deposits.map(deposit => <Item key={deposit._id} name={deposit.name} amount={deposit.amount} date={deposit.date} />)
		

		return (
			<div className="account-info">
				<div className="account-info__name">
					{this.props.name}
				</div>
				<div className="link" onClick={this.props.accountListClick}>
					Return to home
				</div>
				
			
			<div>
				<div>Withdrawals</div>
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


	