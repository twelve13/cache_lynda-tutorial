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

    if(incomingFunds["amount"]>=1){
      this.props.addIncomingFunds(incomingFunds);
      event.target.reset();
      document.getElementById("add-incoming__form").classList.remove("show");
    } else {
      alert("You must enter a positive number amount")
    }
  }


	render() {
		return (
			<div id="add-incoming__form">
        		<form id="add-incoming-funds-form" onSubmit={this.addIncomingFunds}>
          			<input type="text" placeholder="Amount" ref={this.incomingAmountInput} />
          			<input type="text" placeholder="From" ref={this.incomingSourceInput} />
          			<button type="submit">Submit</button>
        		</form>
			</div>
		)
	}
}

export default IncomingFunds;