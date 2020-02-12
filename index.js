const express = require('express');

const commentsRoute = require('./commentsRoute')

const server = express();

server.use('/api/posts', commentsRoute)

server.listen(5000, ()=> console.log('API is running on port 5000'))