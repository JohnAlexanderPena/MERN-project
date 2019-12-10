const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI

//Connect to MongDB
mongoose
  .connect(db,{
useUnifiedTopology: true,
useNewUrlParser: true,
useFindAndModify: false,
})
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err))

  // Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

}



//Passport middleware
app.get(passport.initialize());

// Passpor Config
require('./config/passport')(passport)

app.get('/', (req, resp) => resp.send('Hello World'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile)
app.use('/api/posts', posts)
 //test

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
