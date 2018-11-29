import React, {Component} from "react";

class AddAccount extends Component {
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

    	this.props.addAccount(newAccount);
  	}


	render() {
    
 
    return (
    	
      <div className="create-account">
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

export default AddAccount;