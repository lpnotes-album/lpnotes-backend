const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const secrets = require('../config/secret.js');

const Auth = require('./auth-model.js')


router.post('/', (req, res) => {
    let { username, password } = req.body;
  
    Auth.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(guide);
          res.status(200).json({
            message: `Welcome ${guide.username}! Have a token`, token
          });
        } else {
          res.status(401).json({ message: 'Invalid Credentials' });
        }
      })
      .catch(error => {
        res.status(500).json(error);
      });
  });
  
  function generateToken(guide) {
    const payload = {
      subject: guide.id, // sub in payload is what the token is about
      username: guide.username,
      // ...otherData
    };
  
    const options = {
      expiresIn: '1d', 
      // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  }
  
  module.exports = router;