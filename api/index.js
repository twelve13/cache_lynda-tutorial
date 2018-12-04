import express from "express";
import { MongoClient } from "mongodb";
import assert from "assert";
import config from "../config";

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

router.get("/accounts/:accountName", (req, res) => {
	mdb.collection("accounts")
		.findOne({ name: req.params.accountName })
		.then(account => res.send(account))
		.catch(console.error)
});

router.post("/accounts", (req, res) => {
	mdb.collection("accounts")
		.insertOne(req.body)
		.then(account => res.json(account))	
		.catch(console.error)
});

router.delete("/accounts/:accountName", (req, res) => {
	mdb.collection("accounts")
		.deleteOne({name: req.params.accountName})
		.then(()=> res.json({success: true}))
		.catch(console.error)
});

export default router;