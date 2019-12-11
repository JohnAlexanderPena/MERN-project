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

// Server static assets if in production
if(process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

// catch 404 and forward to error handler
// app.use((req, res, next) => {
//   next(createError(404));
// });

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
  .catch(err => console.log("DB error", err))

  //Passport middleware
app.get(passport.initialize());

// Passpor Config
require('./config/passport')(passport)

// app.get('/', (req, resp) => resp.send('Hello World'));

// Use Routes
app.use('/api/users', users);
app.use('/api/profile', profile)
app.use('/api/posts', posts)
 //test

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
