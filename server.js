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
  // app.get('*', (req, res) => {
  //   res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  // })
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
app.use('/api/users', cors(), users);
app.use('/api/profile',cors(), profile)
app.use('/api/posts',cors(), posts)
 //test
 //Handler for 404 requests
 app.use((req, res, next) => {
   res.status(404).send('We think you are lost')
 });


 const cors = require('cors')

 //Handler for error 500
 app.use((err, req, res, next) => {
   console.error(err.stack);
   res.sendFile(path.join(__dirname, './public/index.html'));
 })

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
