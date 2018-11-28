import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

let mdb;

//in version 2 of Mongo you would get the database object as an argument to the connect callback
//in version 3 you now get a client object containing the database object instead
MongoClient.connect("mongodb://localhost", (err, client) => {
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

router.get("/accounts/:accountName", (req, res) => {
	mdb.collection("accounts")
		.findOne({ name: req.params.accountName })
		.then(account => res.send(account))
		.catch(console.error)
});

export default router;