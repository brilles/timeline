const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = require('../api/secret.js').jwtSecret;
const Users = require('../users/users-model.js');

router.post('/', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findByUsername(username);
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Successful login ${user.username}`,
        token
      });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    user: user.username
  };
  const options = {
    expiresIn: '1d'
  };
  return jwt.sign(payload, secret, options);
}

module.exports = router;
