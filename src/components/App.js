import React, { Component } from 'react';
import Header from "./Header";
import AccountsList from "./AccountsList";
import AccountInfo from "./AccountInfo";
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
        currentAccountId: (event.state || {}).currentAccount Id
      })
    });
  }

  componentWillUnmount() {
    onPopState(null);
  }

  fetchAccount = (accountId) => {
    pushState(
      { currentAccountId: accountId },
      `/account/${accountId}`
    );

    api.fetchAccount(accountId).then(account => {
      this.setState({
        currentAccountId: account.id,
        accounts: {
          ...this.state.accounts,
          [account.id]: account
        }
      });
    });
  };

  fetchAccountList = () => {
    pushState(
      { currentAccountId: null },
      "/"
    );

    api.fetchAccountList().then(accounts => {
      this.setState({
        currentAccountId: null,
        accounts
      });
    });
  };

  currentAccount() {
    return this.state.accounts[this.state.currentAccountId];
  }

  pageHeader() {
    if (this.state.currentAccountId) {
      return this.currentAccount().name;
    }
  }

  currentContent() {
    if (this.state.currentAccountId) {
      return <AccountInfo 
        accountListClick={this.fetchAccountList}
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
      </div>
    );
  }
}

export default App;