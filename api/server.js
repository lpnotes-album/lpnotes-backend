
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');


server.use('/api/login', authRouter);

server.get('/', (req, res) => {
    res.status(200).json({ api: 'up and running!' });
  });


module.exports = server;