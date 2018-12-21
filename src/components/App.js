import React, { Component } from 'react';
import Header from "./Header";
import AccountsList from "./AccountsList";
import AccountInfo from "./AccountInfo";
import AddAccountForm from "./AddAccountForm";
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

  removeAccount = (accountToRemove) => {

    const accountsState = {...this.state.accounts};
    delete accountsState[accountToRemove];

    //set currentAccountName to null so currentContent function will return the accounts list
    api.removeAccount(accountToRemove).then(resp =>
      this.setState({
        accounts: accountsState,
        currentAccountName: null
      })
    )

    pushState(
      { currentAccountName: null },
      "/"
    );
  };

  addWithdrawalFunction = (addToThisAccount, newWithdrawal) => {
    const accountsState = {...this.state.accounts};
    
    api.addWithdrawal(addToThisAccount, newWithdrawal).then(resp =>     
      accountsState[addToThisAccount] = resp,

      this.setState({
        accounts: accountsState
      })
    )
  };

  addDepositFunction = (addToThisAccount, newDeposit) => {
    const accountsState = {...this.state.accounts};
    
    api.addDeposit(addToThisAccount, newDeposit).then(resp =>     
      accountsState[addToThisAccount] = resp,

      this.setState({
        accounts: accountsState
      })
    )
  };

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
        <AccountsList 
          onAccountClickfromApp = {this.fetchAccount}
          accountsfromApp = {this.state.accounts}
          addWithdrawalfromApp = {this.addWithdrawalFunction}
          addDepositfromApp = {this.addDepositFunction} />
        <AddAccountForm addAccount={this.addAccount}/>
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