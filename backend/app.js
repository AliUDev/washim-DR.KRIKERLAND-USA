const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const { queryParser } = require('express-query-parser');
const AppError = require('./utils/AppError');
const errorController = require('./controller/error_controller');
const responseMessages = require('./config/response_messages');
const useragent = require('express-useragent');
const userRoles = require('./config/user_roles');

const app = express();
app.use(useragent.express());
app.use(
  cors({
    origin: process.env.CLIENTNAME,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(helmet());
app.use((req, res, next) => {
  if (req.query.q && req.query.q?.startsWith('0x')) {
    req.query.q = req.query.q?.slice(2);
  }
  next();
});
app.use(
  queryParser({
    parseNull: true,
    parseUndefined: true,
    parseBoolean: true,
    parseNumber: true,
  })
);

app.use('/api/public', express.static(__dirname + '/public'));
app.use('/uploads', express.static(__dirname + '/uploads'));

/**
 * App middlwares
 */
const auth = require('./middlewares/auth');

/**
 * App Controllers.
 */
const AuthController = require('./controller/auth');
const DoctorController = require('./controller/doctor');
const PatientController = require('./controller/patient');

/**
 * Primary app routes.
 */

// Auth Routes

app.post('/api/auth/signup', auth.isLoggedIn, AuthController.assignAccount);
app.post('/api/auth/login', auth.isLoggedIn, AuthController.login);
app.get('/api/auth/logout', auth.isLoggedIn, AuthController.logout);

//Admin Routes
app.post(
  '/api/admin/add_doctor',
  auth.authenticate,
  auth.authorize(userRoles.ACCOUNT_ADMIN),
  DoctorController.addDoctor
);

app.post(
  '/api/admin/add_patient',
  auth.authenticate,
  auth.authorize(userRoles.ACCOUNT_ADMIN),
  PatientController.addPatient
);
/**
 * Error Handling
 */
app.use((req, res, next) => {
  next(
    new AppError(
      responseMessages.URL_NOT_FOUND,
      `The url ${req.originalUrl} does not exist!`,
      404
    )
  );
});

app.use(errorController);

module.exports = app;
