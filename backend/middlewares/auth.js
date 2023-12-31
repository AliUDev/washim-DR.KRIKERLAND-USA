const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../model/User');
const catchAsync = require('../utils/catch_async');
const AppError = require('../utils/AppError');
const responseMessages = require('../config/response_messages');
const userRoles = require('../config/user_roles');

exports.authenticate = catchAsync(async (req, res, next) => {
  console.log('here');
  // 1) Get & Check if there is auth token in the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === 'logged_out') {
    return next(
      new AppError(
        responseMessages.UNAUTHENTICATED,
        'You are not logged in. Please Log in to get access!',
        401
      )
    );
  }

  // 2) Verification of Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  let currentUser = await User.findOne({
    email: decoded.email,
    organization_id: decoded.organization_id,
  }).populate('role', { title: 1, permissions_list: 1, active: 1 });

  if (!currentUser) {
    return next(
      new AppError(responseMessages.USER_NOT_FOUND, 'User does not exist!', 404)
    );
  }

  // 4) Grant Accces To Protected Route
  req.user = currentUser;
  res.locals.user = currentUser;
  console.log('Req.user', req.user);
  next();
});

// Check if the user is logged in (For Views)
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  // 1) Get & Check if there is auth token in the header
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token || token === 'logged_out') {
    return next();
  }

  // 2) Verification of Token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  let currentUser = await User.findOne({
    email: decoded.email,
    organization_id: decoded.organization_id,
  }).populate('role', { title: 1, permissions_list: 1, active: 1 });

  if (!currentUser) {
    return next();
  }

  // 5) Grant Accces To Protected Route
  req.user = currentUser;
  res.locals.user = currentUser;
  return next();
});

exports.authorize = (...allowedRoles) => {
  return (req, res, next) => {
    const isAllowed = allowedRoles.some((role) => {
      return req.user.role.title === role;
    });

    if (!isAllowed) {
      return next(
        new AppError(
          responseMessages.UNAUTHORIZED,
          'You are not authorized to perform this action!',
          403
        )
      );
    }

    next();
  };
};
exports.authorizeAccountAdmin = (...allowedRoles) => {
  return (req, res, next) => {
    const isAllowed = allowedRoles.some((role) => {
      return req.user.role.title == role;
    });

    if (!isAllowed) {
      return next(
        new AppError(
          responseMessages.UNAUTHORIZED,
          'You are not authorized to perform this action!',
          403
        )
      );
    }

    next();
  };
};
