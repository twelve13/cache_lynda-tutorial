import React, { Component } from 'react';
import Header from "./Header";
import Account from "./Account"; 
import data from "../testData";
import axios from "axios";


console.log(data.accounts);

class App extends Component {
	state = {
		accounts: this.props.initialAccounts
	};

	componentDidMount() {
    axios.get("/api/accounts")
    .then(resp => {
      this.setState({
        accounts: resp.data.accounts
      });
    })
    .catch(console.error);

	}


  render() {
    
 
    return (
    	
      <div className="App">
        <Header />
        <p>This is app.js testtesttest</p>
        {this.state.accounts.map(account => <Account key={account.id} {...account}/>)}
      </div>
    );
  }
}

export default App;