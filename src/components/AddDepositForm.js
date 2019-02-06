import React, {Component} from "react";

//CRUD step 4: Hook up form to get user input

class AddDepositForm extends Component {
  amountInput = React.createRef();

  createDeposit = (event) => {
    event.preventDefault();

    const newDeposit = {
      amount: parseFloat(this.amountInput.current.value),
      name: this.props.setIncomingSource,
      date: Date.now
    } 

    const addToThisAccount = this.props.parentAccount;

    if(newDeposit.amount>=0){
      this.props.addDeposit(addToThisAccount, newDeposit);
      event.target.reset();

    } else (
      alert("please enter a positive amount")
    )
  }


	render() {
    
 
    return (
    	
      <div className="create-deposit">
        <form className="add-deposit-form" onSubmit={this.createDeposit}>
          <input type="text" placeholder="Amount" ref={this.amountInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddDepositForm;