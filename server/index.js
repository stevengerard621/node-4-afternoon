require('dotenv').config()
const express = require('express')
const session = require('express-session')
const checkForSession = require("./middlewares/checkForSession")
const swagController = require('./controllers/swagController')
const authController = require('./controllers/authController')

const app = express();

let { SERVER_PORT, SESSION_SECRET} = process.env

app.use(express.json());
app.use(
    session({
        secret: SESSION_SECRET,
        resave: true,
        saveUninitialized: true
    })
);
app.use(checkForSession)

app.post('/api/register', authController.register)
app.post('/api/login', authController.login)
app.post('/api/signout', authController.signout)
app.get('/api/user', authController.getUser)

app.get('/api/swag', swagController.read);

  app.listen(SERVER_PORT, () => {
      console.log(`PORT IS LISTENING ON ${SERVER_PORT} YO`)
  });



