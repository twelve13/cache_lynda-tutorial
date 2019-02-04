import axios from "axios";

//CRUD step 2: set up axios calls

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

export const editAccount = (accountName, editedAccount) => {
	return axios.put(`/api/accounts/${accountName}`, {...editedAccount})
		.then(resp => resp.data);
}

export const removeAccount = (accountName) => {
	return axios.delete(`/api/accounts/${accountName}`)
		.then(resp => resp.data);
};

export const addWithdrawal = (accountName, newWithdrawal) => {
	return axios.post(`/api/accounts/${accountName}/withdrawals`, {...newWithdrawal})
	.then(resp => resp.data);
};

export const addDeposit = (accountName, newDeposit) => {
	return axios.post(`/api/accounts/${accountName}/deposits`, {...newDeposit})
	.then(resp => resp.data);
};