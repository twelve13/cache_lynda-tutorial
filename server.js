import config from "./config";
import apiRouter from "./api";
import express from "express";
import sassMiddleware from "node-sass-middleware";
import path from "path";

const server = express();
server.use(sassMiddleware({
	src: path.join(__dirname, "scss"),
	dest: path.join(__dirname, "public")
}));
server.set('view engine', 'ejs');


import serverRender from "./serverRender";

server.get(['/', '/account/:accountName'], (req, res) => {
	serverRender(req.params.name)
		.then(({ initialMarkup, initialData }) => {
			res.render("index", {
				initialMarkup,
				initialData
			});
		})
		.catch(error => {
			console.error(error);
			res.status(404).send ("Bad Request");
		});
});


server.use(express.static('public'));

server.use("/api", apiRouter);

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});