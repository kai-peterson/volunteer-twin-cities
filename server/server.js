const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

const cors = require('cors');

// Route includes
const userRouter = require('./routes/user.router');
const orgsRouter = require('./routes/orgs.router');

// Body parser middleware
app.use(bodyParser.json({limit: '1 gb'}));
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/orgs', orgsRouter);

// S3 setup
app.use(cors());
const s3Controller = require('./controllers/s3Controller');
app.use('/s3Controller', s3Controller.s3_function);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
