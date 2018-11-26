const Schema = require("./schema.js");

const Account = Schema.Account;
const Withdrawal = Schema.Withdrawal;
const Deposit = Schema.Deposit;


Account.deleteMany({}, err => {
	if(err){
		console.log(err);
	}
});

Withdrawal.deleteMany({}, err => {
	if(err){
		console.log(err);
	}
});

Deposit.deleteMany({}, err => {
	if(err){
		console.log(err);
	}
});

const octoberMortgage = new Withdrawal({name: "October mortgage", amount: 600});
const safeway = new Withdrawal({name: "Safeway", amount: 50});
const gas = new Withdrawal({name: "gas", amount: 30});
const catfood = new Withdrawal({name: "cat food", amount: 15});
const actingClass = new Withdrawal({name: "acting class", amount: 550});

const deposit1 = new Deposit({name: "Paycheck", amount: 1000});
const deposit2 = new Deposit({name: "Paycheck", amount: 1000});
const deposit3 = new Deposit({name: "Birthday money", amount: 100});
const deposit4 = new Deposit({name: "Babysitting", amount: 60});
const deposit5 = new Deposit({name: "Paycheck", amount: 1000});

const mortgage = new Account({name: "Mortgage", suggested: 600, current_amount: 0, notes: "every 2nd Wednesday", status: "All Good", withdrawals: [octoberMortgage], deposits: [deposit1]});
const food = new Account({name: "Food", suggested: 200, current_amount: 100, notes: "", status: "All Good"});
const pets = new Account({name: "Pets", suggested: 25, current_amount: 25, notes: "", status: "All Good"});
const fun = new Account({name: "Fun", suggested: 100, current_amount: 15, notes: "", status: "All Good"});
const car = new Account({name: "Car", suggested: 50, current_amount: 5, notes: "oil change soon", status: "All Good"});

const accounts = [mortgage, food, pets, fun, car];

accounts.forEach((account, i) => {
	account.save((err, account) => {
		if(err){
			console.log(err);
		} else {
			console.log(`${account} was saved to the database`)
		}
	})
});

//in terminal run $node db/seeds.js
//in another terminal tab run $mongo
//>show dbs
//>use cache-react-app
//>db.accounts.find()pretty()