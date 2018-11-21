import React from "react";
import Account from "./Account";

const AccountsList = ({ accounts, onAccountClick }) => (
	<div className="accounts-wrapper">
		{Object.keys(accounts).map(accountId => 
			<Account 
				key={accountId} 
				onClick={onAccountClick}
				{...accounts[accountId]}/>)}
	</div>
)

export default AccountsList;