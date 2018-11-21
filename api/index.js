import express from 'express';
import data from "../src/testData";

const router = express.Router();

router.get("/accounts", (req, res) => {
	res.send({ accounts: data.accounts });
});

export default router;