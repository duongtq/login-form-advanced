const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const crypto = require('crypto');
const mongoose = require('mongoose');
const IO = require('socket.io');
const cors = require('cors');

const uri = require('./db/connection');
const User = require('./models/User');

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = IO(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"],
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('views'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '../views'));

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected.");
    })
    .catch((e) => {
        console.log(e);
    });

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login',  (req, res) => {
    res.render('login');
});

app.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

app.post('/result', (req, res) => {
    const hashedPassword = crypto.createHash('sha256')
                            .update(req.body.password)
                            .digest('base64');    

    const user = {
        username: req.body.username,
        password: hashedPassword
    }

    User.find(user, (err, result) => {
        if (err || result.length == 0) {
            return res.render('loginFailed');
        } else {            
            return res.render('loginSuccessed', {username: user.username});
        } 
    });
});

app.use((err, req, res, next) => {
    if (err) {
        console.log(err.message);
    }
    next();
});

server.listen(PORT, () => {
   console.log(`Render server running at http://localhost:${PORT}.`);
});

module.exports = app;
