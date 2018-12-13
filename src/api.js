import axios from "axios";

export const fetchAccount = (accountName) => {
	return axios.get(`/api/accounts/${accountName}`)
		.then(resp => resp.data);
};

export const fetchAccountList = () => {
	return axios.get("/api/accounts")
		.then(resp => resp.data.accounts);
};

export const addAccount = (newAccount) => {
	return axios.post("/api/accounts", {...newAccount })
		.then(resp => resp.data);
} 

export const removeAccount = (accountName) => {
	return axios.delete(`/api/accounts/${accountName}`)
		.then(resp => resp.data);
};

export const addWithdrawal = (accountName, newWithdrawal) => {
	return axios.post(`/api/accounts/${accountName}`, {...newWithdrawal})
	.then(resp => resp.data);
};