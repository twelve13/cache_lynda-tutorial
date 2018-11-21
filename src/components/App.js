import React, { Component } from 'react';
import Header from "./Header";
import AccountsList from "./AccountsList"

const pushState = (obj, url) =>
  window.history.pushState(obj, "", url);

class App extends Component {
	state = {
		accounts: this.props.initialAccounts
	};

	componentDidMount() {

	}

  fetchAccount = (accountId) => {
    pushState(
      { currentAccountId: accountId },
      `/account/${accountId}`
    );

    this.setState({
      pageHeader: this.state.accounts[accountId].name
    });
  };


  render() {
    
 
    return (
    	
      <div className="App">
        <Header message={this.state.pageHeader}/>
        <AccountsList 
          onAccountClick = {this.fetchAccount}
          accounts={this.state.accounts} />
      </div>
    );
  }
}

export default App;