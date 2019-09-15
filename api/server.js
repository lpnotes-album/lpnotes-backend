
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const server = express();

const authRouter = require('../auth/auth-router.js')

server.use(helmet());
server.use(cors());
server.use(express.json());


server.use('/api', authRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running!' });
  });


module.exports = server;