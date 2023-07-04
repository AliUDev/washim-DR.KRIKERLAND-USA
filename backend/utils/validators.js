const responseMessages = require('../config/response_messages');
const AppError = require('./AppError');

exports.validateUsername = (u) => {
  if (!u) {
    throw new AppError(
      responseMessages.USERNAME_REQUIRED,
      'Username is required!',
      400
    );
  }

  if (!/^[A-Za-z0-9._]+$/.test(u)) {
    throw new AppError(
      responseMessages.INVALID_USERNAME,
      'Username should only contain alphabets numbers _ and .',
      400
    );
  }

  return { status: 'success' };
};

exports.validateEmail = (e) => {
  if (!e) {
    throw new AppError(
      responseMessages.EMAIL_REQUIRED,
      'Email is required!',
      400
    );
  }

  if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      e
    )
  ) {
    throw new AppError(responseMessages.INVALID_EMAIL, 'Email is invalid', 400);
  }

  return { status: 'success' };
};
