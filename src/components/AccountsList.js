import React from "react";
import Account from "./Account";

const AccountsList = ({ accountsfromApp, onAccountClickfromApp, addWithdrawalfromApp }) => (
	<div className="accounts-wrapper">
		{Object.keys(accountsfromApp).map(accountName => 
			<Account 
				key={accountName} 
				onAccountClick={onAccountClickfromApp}
				addWithdrawal={addWithdrawalfromApp}
				{...accountsfromApp[accountName]}/>)}
	</div>
)

export default AccountsList;