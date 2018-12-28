import React, {Component} from "react";

class IncomingFunds extends Component {

  incomingAmountInput = React.createRef();
  incomingSourceInput = React.createRef();

  addIncomingFunds = (event) => {
    event.preventDefault();

    const incomingFunds = {
      amount: parseFloat(this.incomingAmountInput.current.value),
      source: this.incomingSourceInput.current.value
    } 

    this.props.addIncomingFunds(incomingFunds);
  }





	render() {
		return (
			<div>
        		<form onSubmit={this.addIncomingFunds}>
          			<input type="text" placeholder="amount" ref={this.incomingAmountInput} />
          			<input type="text" placeholder="from" ref={this.incomingSourceInput} />
          			<button type="submit">Submit</button>
        		</form>
			</div>
		)
	}
}

export default IncomingFunds;