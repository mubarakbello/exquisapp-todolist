const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const DB_CONN_STRING = process.env.DB_CONN_STRING;

mongoose.connect(DB_CONN_STRING, { useNewUrlParser: true }, err => {
  if (err) {
    console.log('Error connecting to DB due to:', err);
    console.log('Process exiting with code 1');
    process.exit(1);
  }
  console.log('Connected to DB successfully!');
});

const app = express();
const PORT = process.env.PORT || 3108;
mongoose.Promise = global.Promise;

const TodoAPIRoutes = require('./routes');

app.use('/api', TodoAPIRoutes);

app.get('/', (req, res) => {
  console.log('handling get request on /');
  res.send('Reached index route!');
});

app.listen(PORT, () => {
  console.log(`Listening on post ${PORT}`);
});
