import React, {Component} from "react";

class EditAccountForm extends Component {
	editNameInput = React.createRef();
  editCurrentAmountInput = React.createRef();
  editSuggestedInput = React.createRef();
  editNotesInput = React.createRef();

  editAccount = (event) => {
    event.preventDefault();

    const editedAccount = {
    	name: this.editNameInput.current.value,
    	current_amount: parseFloat(this.editCurrentAmountInput.current.value),
    	suggested: parseFloat(this.editSuggestedInput.current.value),
    	notes: this.editNotesInput.current.value
    }
    if(this.editNameInput.current.value!=""){
      this.props.editAccount(editedAccount);
    }else {
      alert("you must enter a name for the account")
    }
  }


	render() {
    
 
    return (
    	
      <div className="edit-account">
        <div>Edit Account</div>
        <form onSubmit={this.editAccount}>
          <input type="text" placeholder="Account Name" ref={this.editNameInput} />
          <input type="text" placeholder="Current Amount" ref={this.editCurrentAmountInput} />
          <input type="text" placeholder="Suggested Amount" ref={this.editSuggestedInput} />
          <input type="text" placeholder="Notes" ref={this.editNotesInput} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default EditAccountForm;