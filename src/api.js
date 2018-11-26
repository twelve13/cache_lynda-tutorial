import axios from "axios";

export const fetchAccount = accountId => {
	return axios.get(`/api/accounts/${accountId}`)
		.then(resp => resp.data);
};

export const fetchAccountList = () => {
	return axios.get("/api/accounts")
		.then(resp => resp.data.accounts);
};