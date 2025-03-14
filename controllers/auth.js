const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const UserSalt = require('../models/UserSalt');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User
      .findOne({ email });
    if (user) {
      return res.status(400)
        .json({ error: 'User already exists' });
    }
    user = new User({
      name,
      email,
      password,
    });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // save the user & salt to the database:
    // NOTE - ideally salt should be stored in a separate collection on different server
    // but bcrypt embedds the salt in the hash so we can store it in the same collection, stupid thing to do ?
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user
      = await
      User.findOne({ email });
    if (!user) {
      return res.status(400)
        .json({ error: 'Invalid Credentials, user not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400)
        .json({ error: 'Invalid Credentials, password mismatch' });
    }
    const payload = {
      user: {
        id: user.id,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: 3600,
    }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  }
  catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
}