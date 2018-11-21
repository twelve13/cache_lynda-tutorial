import express from 'express';
import data from "../src/testData";

const router = express.Router();
const accounts = data.accounts.reduce((obj, account) => {
			obj[account.id] = account;
			return obj;
		}, {})

router.get("/accounts", (req, res) => {
	res.send({ 
		accounts: accounts
	});
});

export default router;