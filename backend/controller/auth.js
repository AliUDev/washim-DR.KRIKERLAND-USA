const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catch_async');
const { validateEmail } = require('../utils/validators');
const getNonce = require('../utils/get_nonce');
const getOtp = require('../utils/get_otp');
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.SECRET_MESSAGE);
const nodemailer = require('nodemailer');
const responseMessages = require('../config/response_messages');
const User = require('../model/User');
const Crud = require('../services/Crud');
const userRoles = require('../config/user_roles');
const get_otp = require('../utils/get_otp');
const Role = require('../model/Role');
const Permissions = require('../config/permissions');
const Organization = require('../model/Organization');
const services = require('../services/Crud');

function signToken(email, organization_id) {
  return jwt.sign({ email, organization_id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN_DAYS + 'd',
  });
}

function sendEmail(email, otp, res) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.SENDER_EMAIL,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  let message = `Here is your OTP for login ${otp}`;

  let mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: 'Your One Time Password',
    text: message,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log('Error occurs', err);
      res.status(400).send({ success: false });
    }
    res.status(200).json({
      status: 'success',
      message: responseMessages.OTP_SEND,
      message_description: 'OTP Sent Successfully',
      otp: otp,
    });
  });
}

function createSendToken(user, statusCode, req, res, options = {}) {
  const token = signToken(user.email, user.organization_id);
  const sendObj = {
    status: 'success',
    message: responseMessages.LOGGED_IN,
    message: 'Logged in successfully!',
    user: user,
    access_token: token,
  };

  // Only send user when its needed
  if (options.sendUser === true) {
    sendObj.user = user;
  }

  // Set Cookies Options
  const cookieOptions = {
    httpOnly: true, // So that Cookie can not be accessed or modified by the client/browser
    expires: new Date(
      Date.now() + Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers['x-forwarded-proto'] === true,
  };

  // Send Cookies
  res.cookie('jwt', token, cookieOptions);

  res.status(statusCode).json(sendObj);
}

/**
 * POST
 * Add a User on Buying Subscription
 */

exports.assignAccount = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next(
      new AppError(
        responseMessages.ALREADY_LOGGED_IN,
        'You are already logged in!',
        403
      )
    );
  }

  const { email, full_name, password, role } = req.body;

  if (!email) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email is required!',
        400
      )
    );
  }

  if (!full_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Full name is required!',
        400
      )
    );
  }

  if (!password) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!role) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Role is required!',
        400
      )
    );
  }
  // Validate Email
  validateEmail(email.trim());

  let ogrID = await getNonce();

  const organization = await Organization.findOne({
    organization_id: ogrID,
  });

  if (organization) {
    return next(
      new AppError(
        responseMessages.ALREADY_EXIST,
        'Organization already Exist!',
        400
      )
    );
  }

  if (!organization) {
    const new_org = new Organization({
      organization_id: ogrID,
    });
    await new_org.save();
    ogrID = new_org.organization_id;
  }

  const userExist = await User.findOne({
    email,
    organization: ogrID,
  });

  if (userExist) {
    return next(
      new AppError(responseMessages.ALREADY_EXIST, 'User already Exist!', 400)
    );
  }

  let roleExist = await Role.findOne({
    title: role,
    active: 1,
    organization_id: ogrID,
  });
  if (roleExist) {
    return next(
      new AppError(responseMessages.NOT_ALLOWED, 'Role Already Exist', 400)
    );
  }
  if (!roleExist) {
    const new_role = new Role({
      title: role,
      permissions: Permissions.permissions,
      organization_id: ogrID,
    });
    roleExist = await new_role.save();
  }

  const new_user = new User({
    email,
    full_name,
    role: roleExist._id,
    organization_id: ogrID,
    password: cryptr.encrypt(password),
  });

  const saved_user = await new_user.save();
  const result = await services.updateOneAndReturn(
    Organization,
    { organization_id: ogrID },
    { users: saved_user._id, roles: roleExist._id },
    {}
  );
  console.log('Results', result);
  res.status(200).json({
    status: 'success',
    message: responseMessages.SIGNUP_SUCCESS,
    message_description: 'User signup is successful!',
  });
});
/**
 * POST
 * Add a User on Buying Subscription
 */

exports.signup = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next(
      new AppError(
        responseMessages.ALREADY_LOGGED_IN,
        'You are already logged in!',
        403
      )
    );
  }

  const { email, full_name, role, password } = req.body;

  if (!email) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email is required!',
        400
      )
    );
  }

  if (!full_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Full name is required!',
        400
      )
    );
  }

  if (!role) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Role is required!',
        400
      )
    );
  }
  if (!password) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }

  // Validate Email
  validateEmail(email.trim());

  const ogrID = await getNonce();

  const organization = await User.findOne({
    organization_id: ogrID,
  });

  if (organization) {
    return next(
      new AppError(
        responseMessages.ALREADY_EXIST,
        'Organization already Exist!',
        400
      )
    );
  }

  const userExist = await User.findOne({
    email,
    organization: ogrID,
  });

  if (userExist) {
    return next(
      new AppError(responseMessages.ALREADY_EXIST, 'User already Exist!', 400)
    );
  }

  let roleExist = await Role.findOne({
    title: role,
    active: 1,
  });
  if (roleExist) {
    return next(
      new AppError(responseMessages.NOT_ALLOWED, 'Role Already Exist', 400)
    );
  }
  if (!roleExist) {
    const new_role = new Role({
      title: role,
      permissions: Permissions.permissions,
    });
    roleExist = await new_role.save();
  }

  const new_user = new User({
    email,
    full_name,
    role: roleExist._id,
    password: cryptr.encrypt(password),
  });

  const saved_user = await new_user.save();
  res.status(200).json({
    status: 'success',
    message: responseMessages.SIGNUP_SUCCESS,
    message_description: 'User signup is successful!',
  });
});

/**
 * POST
 * Login a User
 */

exports.login = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next(
      new AppError(
        responseMessages.ALREADY_LOGGED_IN,
        'You are already logged in!',
        403
      )
    );
  }

  const { email, password, organization_id, role } = req.body;

  if (!email || !password || !organization_id || !role) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email Address, Organization_id, Role & Password are required!',
        400
      )
    );
  }

  let user = await User.findOne({
    email,
    organization_id,
  }).populate('role', { active: 1, title: 1, permissions: 1 });

  if (!user) {
    return next(
      new AppError(responseMessages.USER_NOT_FOUND, 'User does not exist!', 404)
    );
  }
  let pass = cryptr.decrypt(user.password);
  if (password != pass) {
    return next(
      new AppError(
        responseMessages.INCORRECT_CREDENTIALS,
        'Invalid password!',
        404
      )
    );
  }

  createSendToken(user, 200, req, res, { user: true });
});

/**
 * POST
 * Send OTP
 */

exports.sendOTP = catchAsync(async (req, res, next) => {
  if (req.user) {
    return next(
      new AppError(
        responseMessages.ALREADY_LOGGED_IN,
        'You are already logged in!',
        403
      )
    );
  }

  const email = req.body.email;

  if (!email) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email Address is required!',
        400
      )
    );
  }

  const otp = await getOtp();
  sendEmail(email, otp, res);
});
/**
 * GET
 * Logout User
 */

exports.logout = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(
      new AppError(
        responseMessages.UNAUTHENTICATED,
        'You are not logged in!',
        403
      )
    );
  }

  // Set Cookies Options
  const cookieOptions = {
    httpOnly: true, // So that Cookie can not be accessed or modified by the client/browser
    expires: new Date(
      Date.now() + Number(process.env.JWT_EXPIRES_IN_DAYS) * 24 * 60 * 60 * 1000
    ),
    secure: req.secure || req.headers['x-forwarded-proto'] === true,
  };

  // Send Cookies
  res.cookie('jwt', 'logged_out', cookieOptions);

  res.status(200).json({
    status: 'success',
    message: responseMessages.LOGGED_OUT,
    message: 'Logged out successfully!',
    token: 'logged_out',
  });
});

/**
 * POST
 * Verify OTP
 */

exports.verifyOTP = catchAsync(async (req, res, next) => {
  const { email, organization_id, otp } = req.body;

  if (!email || !get_otp || !organization_id) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email Address, OTP and Organization are required!',
        400
      )
    );
  }

  const user = await User.find({
    email,
    organization_id,
    password: pass1,
  });

  if (!user) {
    return next(
      new AppError(responseMessages.USER_NOT_FOUND, 'User does not exist!', 404)
    );
  }

  createSendToken(user, 200, req, res, { user: true });
});
