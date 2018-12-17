import React, {Component} from "react";
import App from "./app";

class Header extends Component {
	render() {
		return (
			<header className = "header" onClick={this.props.accountListClick}>
				<div>Cache</div>
			</header>
		)
	}
}

export default Header;