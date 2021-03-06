import React, {Component} from "react";

class AddAccountForm extends Component {
	nameInput = React.createRef();
  currentAmountInput = React.createRef();
  suggestedInput = React.createRef();
  notesInput = React.createRef();

  createAccount = (event) => {
    event.preventDefault();

    const newAccount = {
    	name: this.nameInput.current.value,
    	current_amount: parseFloat(this.currentAmountInput.current.value),
    	suggested: parseFloat(this.suggestedInput.current.value),
    	notes: this.notesInput.current.value
    }
    if(this.nameInput.current.value!=""){
      this.props.addAccount(newAccount);
    } else {
      alert("you must enter a name for the account")
    }

    event.target.reset();
  }


	render() {
    
 
    return (
    	
      <div className="create-account">
        <div>Add Account</div>
        <form onSubmit={this.createAccount}>
          <input type="text" placeholder="Account Name" ref={this.nameInput} />
          <input type="text" placeholder="Current Amount" ref={this.currentAmountInput} />
          <input type="text" placeholder="Suggested Amount" ref={this.suggestedInput} />
          <input type="text" placeholder="Notes" ref={this.notesInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default AddAccountForm;