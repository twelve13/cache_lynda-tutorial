const mongoose = require("mongoose");

mongoose.Promise = require("bluebird");

mongoose.connect("mongodb://localhost/cache-react-app", {useNewUrlParser: true});

mongoose.connection.on("error", err => {
	console.log(err);
})

mongoose.connection.once("open", () => {
	console.log("mongoose database has been connected");
});

const WithdrawalSchema = new mongoose.Schema({
	name: String,
	date: {type: Date, default: Date.now},
	amount: Number
});

const DepositSchema = new mongoose.Schema({
	name: String,
	date: {type: Date, default: Date.now},
	amount: Number
});

const AccountSchema = new mongoose.Schema({
	name: String,
	suggested: Number,
	current_amount: Number,
	notes: String,
	status: String,
	withdrawals: [WithdrawalSchema],
	deposits: [DepositSchema]
});


export var Account = mongoose.model("Account", AccountSchema);
export var Withdrawal = mongoose.model("Withdrawal", WithdrawalSchema);
export var Deposit = mongoose.model("Deposit", DepositSchema);



//in terminal run $node db/schema.js