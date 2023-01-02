if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}
const config = require("./app/config/config");

const express = require('express');
const app = express();

const { auth } = require("./app/helpers/auth");
app.use(auth);

const routes = require("./app/routes");
routes(app);

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port);
});