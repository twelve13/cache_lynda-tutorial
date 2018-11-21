import React from "react";

const Account = (account) => (
	<div className="account">
		<div>This is an account:</div>
		<div>Name: {account.name}</div>
		<div>Suggested: {account.suggested}</div>
	</div>
);

export default Account;