const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
var cors = require('cors')
require('dotenv').config();

app.use(cors())
app.use(bodyParser.json());
//app.use(express.json())
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
            res.status(200).send(user);
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
