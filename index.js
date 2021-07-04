require('dotenv').config();

const express = require('express');

const commentsRoute = require('./commentsRoute')

const server = express();

server.use('/api/posts', commentsRoute)

const port = process.env.PORT || 5000;

server.listen(port, () => {
  console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
});