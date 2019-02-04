import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import config from "./config";
import axios from "axios";

const getApiUrl = accountName => {
	if (accountName) {
		return `${config.serverUrl}/api/accounts/${accountName}`;
	}
	return `${config.serverUrl}/api/accounts`;
};

const getInitialData = (accountName, apiData) => {
	if (accountName) {
		return {
			currentAccountName: apiData.name,
			accounts: {
				[apiData.name]: apiData
			}
		};
	}
	return {
		accounts: apiData.accounts,
		incomingFunds: 0
	};
};

const serverRender = (accountName) =>
	axios.get(getApiUrl(accountName))
		.then(resp => {
			const initialData = getInitialData(accountName, resp.data);
			return {
				initialMarkup: ReactDOMServer.renderToString(
					<App initialData={initialData} />
				),
				initialData
			};
		})
		.catch(console.error);


export default serverRender;