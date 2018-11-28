import React, {Component} from "react";

class Item extends Component {
	render () {
		return (
			<div className="account-info__item">
				<div>Name: {this.props.name}</div>
				<div>Amount: {this.props.amount}</div>
				<div>Date: {this.props.date}</div>
			</div>
		)
	}
}

export default Item;