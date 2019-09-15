const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 
const secrets = require('../config/secret.js');

const Auth = require('./auth-model.js')


router.post('/login', validPatron, (req, res) => {
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

router.post('/register', validPatron, async (req,res)=>{
  try {
    let newPatron = req.body;

    const hash = bcrypt.hashSync(newPatron.password,11);
    newGuide.password = hash;

    const newPatronToAdd = await Auth.add(newPatron);

    res.status(201).json(newPatronToAdd);

  } catch (err) {
    res.status(403).json({message: 'Registering new patron impossible', errMessage:err})
  }
});


router.get('/', (req, res) => {
    res.status(200).json({message:"Endpoint works"});
})
  
  function generateToken(patron) {
    const payload = {
      subject: patron.id, // sub in payload is what the token is about
      username: patron.username,
      // ...otherData
    };
  
    const options = {
      expiresIn: '1d', 
      // show other available options in the library's documentation
    };
  
    // extract the secret away so it can be required and used where needed
    return jwt.sign(payload, secrets.jwtSecret, options); // this method is synchronous
  }

  async function validPatron( req, res, next) {
    const {username, password} = req.body; 
    try{
      if (username && password){
        next();
        
      } else {
        res.status(403).json({message:"You need a username and/or password!"})
      }
    } catch (err) {
      res.status(500).json({message:"cannot validate", errMessage:err})
    }
  }
  




  module.exports = router;