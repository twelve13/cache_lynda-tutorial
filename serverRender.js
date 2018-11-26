import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App";

import config from "./config";
import axios from "axios";

const getApiUrl = accountId => {
	if (accountId) {
		return `${config.serverUrl}/api/accounts/${accountId}`;
	}
	return `${config.serverUrl}/api/accounts`;
};

const getInitialData = (accountId, apiData) => {
	if (accountId) {
		return {
			currentAccountId: apiData.id,
			accounts: {
				[apiData.id]: apiData
			}
		};
	}
	return {
		accounts: apiData.accounts
	};
};

const serverRender = (accountId) =>
	axios.get(getApiUrl(accountId))
		.then(resp => {
			const initialData = getInitialData(accountId, resp.data);
			return {
				initialMarkup: ReactDOMServer.renderToString(
					<App initialData={initialData} />
				),
				initialData
			};
		})
		.catch(console.error);


export default serverRender;