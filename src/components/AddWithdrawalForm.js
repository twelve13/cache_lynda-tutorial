import React, {Component} from "react";

//CRUD step 4: Hook up form to get user input

class AddWithdrawalForm extends Component {
  amountInput = React.createRef();
  nameInput = React.createRef();
  dateInput = React.createRef();

  createWithdrawal = (event) => {
    event.preventDefault();

    const newWithdrawal = {
      amount: parseFloat(this.amountInput.current.value),
      name: this.nameInput.current.value,
      date: this.dateInput.current.value
    } 

    const addToThisAccount = this.props.parentAccount;

    this.props.addWithdrawal(addToThisAccount, newWithdrawal);

    event.target.reset();
  }


	render() {
    
 
    return (
    	
      <div className="create-withdrawal">
        <form onSubmit={this.createWithdrawal}>
          <input type="text" placeholder="Amount spent" ref={this.amountInput} />
          <input type="text" placeholder="For" ref={this.nameInput} />
          <input type="text" placeholder="Date" ref={this.dateInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddWithdrawalForm;