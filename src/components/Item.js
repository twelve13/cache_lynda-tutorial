import React, {Component} from "react";

class Item extends Component {
	render () {
		return (
			<div className="account-info__item">
				<div>{this.props.name}</div>
				<div>{this.props.amount}</div>
				<div>{this.props.date}</div>
			</div>
		)
	}
}

export default Item;