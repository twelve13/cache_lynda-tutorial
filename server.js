import config from "./config";
import express from "express";
import fs from "fs";

const server = express();

//ejs is for effective javascript templating.  set view engine to ejs
server.set('view engine', 'ejs');

//for learning purposes only
console.log(`the export from the config file is ${config}`);
//$ ./node_modules/.bin/babel-node server.js will spit ^that out in the terminal

//server.get('/', (req, res) => {
//	res.send('a message from Express!');
//});
//in one terminal tab run $npm start, it'll say Express listening on port 8080
//in another terminal tab run $curl http://localhost:8080/ and you should see ^message
//or in web browser go to localhost:8080 to see message

server.get('/', (req, res) => {
	res.render('index', {
		content: "This is from the ejs file"
	});
});

server.get('/somepage.html', (req, res) => {
	res.send('this is a static string');
});
//in another terminal tab run $curl http://localhost:8080/somepage.html and you should see ^message

server.get('/learningpage.html', (req, res) => {
	fs.readFile('./learningpage.html', (err, data) => {
		res.send(data.toString());
	});
});

//don't even need any of that if you do
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info('Express listening on port', config.port);
});