import React, {Component} from "react";
import Account from "./Account";
import App from "./app";



class AccountsList extends Component {
	render() {
		return (
	<div className="accounts-wrapper">
		{Object.keys(this.props.accountsfromApp).map(accountName => 
			<Account 
				key={accountName} 
				onAccountClick={this.props.onAccountClickfromApp}
				addWithdrawal={this.props.addWithdrawalfromApp}
				{...this.props.accountsfromApp[accountName]}
			/>)}
	</div>
		)
	}
}

export default AccountsList;