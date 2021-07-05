const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const app = express();
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');
const port = process.env.PORT || 3000;

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '!db!test',
        database: 'smart-brain'
    }
});

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working!') })
app.post('/signin', signin.handleSignin(db, bcrypt))
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })

app.listen(port, () => {
    console.log(`App is running on port ${port}!`);
})

/*
    / = this is working
    /signin = POST -> success/fail
    /register = POST -> new user
    /profile/:userId = GET -> user
    /image = PUT -> updated user
*/