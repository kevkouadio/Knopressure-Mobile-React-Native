const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const uri = process.env.DB_CONNECTION;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('users', UserSchema);

const saltRounds = 10;
const secret = process.env.JWT_SECRET;

app.post('/signup', async (req, res) => {
    try {
        const hash = await bcrypt.hash(req.body.password, saltRounds);
        const newUser = new User({ username: req.body.username, email: req.body.email, password: hash });
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        console.log("Error in Signup: ", err);
        return res.status(500).send(err);
    }
});

app.post('/login', (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (err) {
            console.log("Error in Login: ", err);
            return res.status(500).send(err);
        }
        if (!user) return res.status(404).send("User not found.");
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (err) {
                console.log("Error in Login: ", err);
                return res.status(500).send(err);
            }
            if (!result) return res.status(401).send("Wrong password.");

            const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });
            //res.header('auth-token', token);
            res.status(200).json({ token });
        });
    });
});

app.get('/users', (req, res) => {
    User.find({}, (err, users) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(200).json(users);
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }
      if (!user) {
        return res.status(404).send({ message: 'User not found' });
      }
      res.status(200).json(user);
    });
  });

app.use((req, res, next) => {
    const token = req.header('auth-token');
    console.log("token", token);
    if (!token) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token, secret);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
});
  
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => {
    console.log('Server listening on port 3000!');
    User.find({}, (err, users) => {
        if (err) return console.log(err);
        //console.log(users);
    });
});
