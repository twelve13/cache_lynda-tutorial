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
          ...this.state.accounts,
          [account.name]: account
        }
      });
    });
  };

  currentAccount() {
    return this.state.accounts[this.state.currentAccountName];
  }

  pageHeader() {
    if (this.state.currentAccountName) {
      return this.currentAccount().name;
    }
  }

  //CRUD step 2: create functions in App.js

  addAccount = (newAccount) => {
    api.addAccount(newAccount).then(resp =>
      this.setState({
        accounts: {
          ...this.state.accounts,
          [resp._id]: resp
        }
      })
    )
  };

  removeAccount = (accountToRemove) => {
    api.removeAccount(accountToRemove)
  };

  addWithdrawalFunction = (addToThisAccount, newWithdrawal) => {
    api.addWithdrawal(addToThisAccount, newWithdrawal)
  };

  currentContent() {
    if (this.state.currentAccountName) {
      return <AccountInfo 
        accountListClick={this.fetchAccountList}
        removeAccount = {this.removeAccount}
        {...this.currentAccount()} />
    } 
      return <AccountsList 
        onAccountClickfromApp = {this.fetchAccount}
        accountsfromApp = {this.state.accounts}
        addWithdrawalfromApp = {this.addWithdrawalFunction} />
  }

  render() {
    
 
    return (
    	
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}

        <AddAccountForm addAccount={this.addAccount}/>
      </div>
    );
  }
}

export default App;