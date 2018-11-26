import axios from "axios";

export const fetchAccount = accountName => {
	return axios.get(`/api/accounts/${accountName}`)
		.then(resp => resp.data);
};

export const fetchAccountList = () => {
	return axios.get("/api/accounts")
		.then(resp => resp.data.accounts);
};