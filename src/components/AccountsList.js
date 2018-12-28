import React, {Component} from "react";
import Account from "./Account";
import App from "./app";

//CRUD step 5: pass form props down

class AccountsList extends Component {
	render() {
		return (
	<div className="accounts-wrapper">
		{Object.keys(this.props.accountsfromApp).map(accountName => 
			<Account 
				key={accountName} 
				onAccountClick={this.props.onAccountClickfromApp}
				addWithdrawal={this.props.addWithdrawalfromApp}
				addDeposit={this.props.addDepositfromApp}
				setIncomingSource={this.props.setIncomingSource}
				{...this.props.accountsfromApp[accountName]}
			/>)}
	</div>
		)
	}
}

export default AccountsList;