import React, {Component} from "react";

class AccountInfo extends Component {
	render() {
		return (
			<div className="account-info">
				<div>
					{this.props.current_amount}
				</div>
				<div className="link" onClick={this.props.accountListClick}>
					Return to home
				</div>
			</div>
		)
	}
}

export default AccountInfo;