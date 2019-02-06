import React, { Component } from 'react';
import Header from "./Header";
import AccountsList from "./AccountsList";
import AccountInfo from "./AccountInfo";
import AddAccountForm from "./AddAccountForm";
import IncomingFunds from "./IncomingFunds";
import * as api from "../api";

const pushState = (obj, url) =>
  window.history.pushState(obj, "", url);

const onPopState = handler => {
  window.onpopstate = handler;
}


class App extends Component {
	state = this.props.initialData;

  componentDidMount() {
    onPopState((event) => {
      this.setState({
        currentAccountName: (event.state || {}).currentAccountName
      });
    });
  }

  componentWillUnmount() {
    onPopState(null);
  }

  fetchAccountList = () => {
    pushState(
      { currentAccountName: null },
      "/"
    );

    api.fetchAccountList().then(accounts => {
      this.setState({
        currentAccountName: null,
        accounts
      });
    });
  };

  fetchAccount = (accountName) => {
    pushState(
      { currentAccountName: accountName },
      `/account/${accountName}`
    );

    api.fetchAccount(accountName).then(account => {
      this.setState({
        currentAccountName: accountName,
        accounts: {
          ...this.state.accounts
        }
      });
    });
  };

  currentAccount() {
    return this.state.accounts[this.state.currentAccountName];
  }

  //CRUD step 3: create functions in App.js

  addAccount = (newAccount) => {
    api.addAccount(newAccount).then(resp =>
      this.setState({
        accounts: {
          ...this.state.accounts,
          [resp.name]: resp
        }
      })
    )
  };

  editAccount = (accountToEdit, editedAccount) => {
    const accountsState = {...this.state.accounts};
    accountsState[accountToEdit]["name"] = editedAccount["name"];
    accountsState[accountToEdit]["current_amount"] = editedAccount["current_amount"];
    accountsState[accountToEdit]["suggested"] = editedAccount["suggested"];
    accountsState[accountToEdit]["notes"] = editedAccount["notes"];
    api.editAccount(accountToEdit, editedAccount).then(resp =>
      this.setState({
                accounts: accountsState
      })
    )
  };

  removeAccount = (accountToRemove) => {
    const accountsState = {...this.state.accounts};
    const incomingFundsState = this.state.incomingFunds;
    const freedUpMoney = accountsState[accountToRemove]["current_amount"];
    delete accountsState[accountToRemove];
  

    //set currentAccountName to null so currentContent function will return the accounts list
    api.removeAccount(accountToRemove).then(resp =>
      this.setState({
        accounts: accountsState,
        incomingFunds: incomingFundsState + freedUpMoney,
        currentAccountName: null
      })
    )

    pushState(
      { currentAccountName: null },
      "/"
    );
  };

  addIncomingFunds = incomingFunds => {
    const incomingFundsState = this.state.incomingFunds;
    this.setState({
      incomingFunds: incomingFundsState + incomingFunds.amount,
      incomingSource: incomingFunds.source
    })
  };

  addWithdrawalFunction = (addToThisAccount, newWithdrawal) => {
    const accountsState = {...this.state.accounts};
    //don't allow a withdrawal if there isn't enough to cover it from the account's current funds
    if(accountsState[addToThisAccount]["current_amount"]>= newWithdrawal.amount){
      accountsState[addToThisAccount]["current_amount"]=accountsState[addToThisAccount]["current_amount"]-newWithdrawal.amount;

      api.addWithdrawal(addToThisAccount, newWithdrawal).then(resp =>     
        accountsState[addToThisAccount] = resp,
        this.setState({
          accounts: accountsState
        })
      )
    } else {
        alert("not enough funds in account")
    }
  };

  addDepositFunction = (addToThisAccount, newDeposit) => {
    const accountsState = {...this.state.accounts};
    const incomingFundsState = this.state.incomingFunds;
    //don't allow a deposit if there isn't enough to cover it from the Funds to allocate
    if(incomingFundsState >= newDeposit.amount){
      accountsState[addToThisAccount]["current_amount"]=accountsState[addToThisAccount]["current_amount"]+newDeposit.amount;

      api.addDeposit(addToThisAccount, newDeposit).then(resp =>     
        accountsState[addToThisAccount] = resp,
        this.setState({
          accounts: accountsState,
          incomingFunds: incomingFundsState - newDeposit.amount
        })
      )
    } else {
        alert("not enough funds to allocate");
      }; 
  };

  showIncomingForm = () => {
    document.getElementById("add-incoming__form").classList.add("show");
  }

  currentContent() {
    //for specific account page
    if (this.state.currentAccountName) {
      return <AccountInfo 
        removeAccount = {this.removeAccount}
        {...this.currentAccount()} />
    }
    //for accounts overview page
    return (
      <div>
        <div id="funds-allocate">
          <div>Funds to allocate: ${this.state.incomingFunds}</div>
          <div id="add-incoming">
            <div id="add-incoming__button" onClick={this.showIncomingForm}>Add incoming funds</div>
            <IncomingFunds addIncomingFunds = {this.addIncomingFunds}/>
          </div>
        </div>
        <AccountsList 
          goToLogPage = {this.fetchAccount}
          editAccount = {this.editAccount}
          accountsfromApp = {this.state.accounts}
          addWithdrawalfromApp = {this.addWithdrawalFunction}
          addDepositfromApp = {this.addDepositFunction}
          setIncomingSource = {this.state.incomingSource} />
        <AddAccountForm addAccount={this.addAccount} />
      </div>
    )
  }



  render() {
    
 
    return (
    	
      <div className="App">
        <Header accountListClick={this.fetchAccountList}/>
        {this.currentContent()}
      </div>
    );
  }
}

export default App;