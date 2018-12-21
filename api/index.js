import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";
import * as models from "../db/schema";

let mdb;

MongoClient.connect("mongodb://localhost", { useNewUrlParser: true }, (err, client) => {
	assert.equal(null, err);

	mdb = client.db("cache-react-app");
});

const router = express.Router();

router.get("/accounts", (req, res) => {
	let accounts = {};
	mdb.collection("accounts").find({})

		.each((err, account) => {
			assert.equal(null, err);

			if (!account) { // no more accounts
				res.send({accounts});
				return;
			}

			accounts[account.name] = account;
		});
});

//CRUD step 1: set up server routing, test with Postman

router.get("/accounts/:accountName", (req, res) => {
	models.Account
		.find({ name: req.params.accountName })
		.then(account => res.send(account))
		.catch(console.error)
});

router.post("/accounts", (req, res) => {
	models.Account
		.create(req.body)
		.then(account => res.json(account))	
		.catch(console.error)
});

router.delete("/accounts/:accountName", (req, res) => {
	models.Account
		.findOneAndRemove({ name: req.params.accountName })
		.then(()=> res.json({success: true}))
		.catch(console.error)
});

router.post("/accounts/:accountName/withdrawals", (req, res) => {
	models.Account
		.findOne({ name: req.params.accountName })
		.then((account) => {
			models.Withdrawal.create(req.body).then((withdrawal) => {
				account.withdrawals.push(withdrawal);
				account.current_amount = account.current_amount - req.body.amount;
				account.save().then((account) => {
					res.json(account);
				});
			});
		});
});

router.post("/accounts/:accountName/deposits", (req, res) => {
	models.Account
		.findOne({ name: req.params.accountName })
		.then((account) => {
			models.Deposit.create(req.body).then((deposit) => {
				account.deposits.push(deposit);
				account.current_amount = account.current_amount + req.body.amount;
				account.save().then((account) => {
					res.json(account);
				});
			});
		});
});
export default router;