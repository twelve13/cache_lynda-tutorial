import config from "./config";
import apiRouter from "./api";
import express from "express";

const server = express();
server.set('view engine', 'ejs');


import serverRender from "./serverRender";

server.get('/', (req, res) => {
	serverRender()
		.then(content => {
			res.render("index", {
				content
			});
		})
		.catch(console.error)
	
});

server.get('/somepage.html', (req, res) => {
	res.send('this is a static string');
});
//in another terminal tab run $curl http://localhost:8080/somepage.html and you should see ^message

// server.get('/learningpage.html', (req, res) => {
// 	fs.readFile('./learningpage.html', (err, data) => {
// 		res.send(data.toString());
// 	});
// });

//don't even need any of that if you do
server.use(express.static('public'));

server.use("/api", apiRouter);

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});