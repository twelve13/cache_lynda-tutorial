import React from "react";
import ReactDOMServer from "react-dom/server";

import App from "./src/components/App"

import config from "./config";
import axios from "axios";

const serverRender = () =>
	axios.get(`${config.serverUrl}/api/accounts`)
		.then(resp => {
			return ReactDOMServer.renderToString(
					<App initialAccounts={resp.data.accounts} />
					);
		})
		.catch(console.error);


export default serverRender;