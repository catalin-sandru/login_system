const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth')

// User model
const User = require('../../models/User.schema');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  // simple validation
  if(!password || !email) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  // Check fo existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json({ message: "User does not exist"});

    // Validate password
    bcrypt.compare(password, user.password)
      .then(isMatch => {
        if(!isMatch) return res.status(400).json({ message: "Invalid credentials"});

        jwt.sign(
          { id: user.id },
          config.get('jwtSecret'),
          { expiresIn: 3600 }, 
          (err, token) => {
            if(err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email
              }
            })
          }
        )
      })
    })
});

router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = router;