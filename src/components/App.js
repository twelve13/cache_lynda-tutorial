import React, { Component } from 'react';
import Header from "./Header";
import AccountsList from "./AccountsList";
import AccountInfo from "./AccountInfo";
import * as api from "../api";
import AddAccountForm from "./AddAccountForm";

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
      })
    });
  }

  componentWillUnmount() {
    onPopState(null);
  }

  fetchAccount = (accountName) => {
    pushState(
      { currentAccountName: accountName },
      `/account/${accountName}`
    );

    api.fetchAccount(accountName).then(account => {
      this.setState({
        currentAccountName: account.name,
        accounts: {
          ...this.state.accounts,
          [account.name]: account
        }
      });
    });
  };

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

  currentAccount() {
    return this.state.accounts[this.state.currentAccountName];
  }

  pageHeader() {
    if (this.state.currentAccountName) {
      return this.currentAccount().name;
    }
  }

  //CRUD step 2: create functions in App.js and include in currentContent()

  addAccount = (newAccount) => {
    api.addAccount(newAccount)
  };

  removeAccount = (accountToRemove) => {
    api.removeAccount(accountToRemove)
  };

  currentContent() {
    if (this.state.currentAccountName) {
      return <AccountInfo 
        accountListClick={this.fetchAccountList}
        addAccount = {this.addAccount}
        removeAccount = {this.removeAccount}
        {...this.currentAccount()} />
    } 
      return <AccountsList onAccountClick = {this.fetchAccount}
      accounts = {this.state.accounts} />
    
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