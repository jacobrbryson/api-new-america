require('dotenv').config();

import config from "./config";
import express from 'express';

const app = express();

app.use(express.urlencoded({ extended: false })).use(express.json());

import routes from "./routes";
app.use("/", routes);

app.listen(config.port, () => {
  console.log('Listening on port ' + config.port);
});