import React from "react";
import Account from "./Account";

const AccountsList = ({ accounts, onAccountClick }) => (
	<div className="accounts-wrapper">
		{Object.keys(accounts).map(accountName => 
			<Account 
				key={accountName} 
				onClick={onAccountClick}
				{...accounts[accountName]}/>)}
	</div>
)

export default AccountsList;