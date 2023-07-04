const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catch_async');
const { validateEmail } = require('../utils/validators');
const getNonce = require('../utils/get_nonce');
const responseMessages = require('../config/response_messages');
const User = require('../model/User');
const Crud = require('../services/Crud');
const userRoles = require('../config/user_roles');
const Cryptr = require('cryptr');
const Role = require('../model/Role');
const cryptr = new Cryptr(process.env.SECRET_MESSAGE);
const Permissions = require('../config/permissions');
const services = require('../services/Crud');
const Organization = require('../model/Organization');

/**
 * POST
 * Signup to add a role
 */

exports.addDoctor = catchAsync(async (req, res, next) => {
  console.log('here');
  const {
    first_name,
    middle_name,
    last_name,
    dob,
    street1,
    city,
    state,
    zip,
    phone1,
    phone2,
    fax,
    shift,
    timing,
    clinic_name,
    clinic_address,
    role,
    email,
    organization_id,
  } = req.body;

  if (!first_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Organization ID is required!',
        400
      )
    );
  }
  if (!middle_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Email is required!',
        400
      )
    );
  }
  if (!last_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Full name is required!',
        400
      )
    );
  }
  if (!dob) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Username is required!',
        400
      )
    );
  }

  if (!street1) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Role is required!',
        400
      )
    );
  }

  if (!city) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!state) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!zip) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }

  if (!phone1) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }

  if (!phone2) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!fax) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }

  if (!shift) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!timing) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }

  if (!clinic_name) {
    return next(
      new AppError(
        responseMessages.MISSING_REQUIRED_FIELDS,
        'Password is required!',
        400
      )
    );
  }
  if (!clinic_address) {
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

  let findRole = await Role.findOne({
    title: role,
    organization_id,
  });

  if (findRole) {
    if (findRole.active == 0) {
      return next(
        new AppError(
          responseMessages.NOT_ALLOWED,
          'You cannot add inactive role',
          400
        )
      );
    }
  }
  console.log('here123');
  if (!findRole) {
    console.log('her123444', organization_id);
    const new_role = new Role({
      title: role,
      permissions: Permissions.permissions,
      organization_id: organization_id,
    });

    findRole = await new_role.save();
  }
  console.log('here7');
  const new_user = new User({
    email,
    organization_id,
    first_name,
    middle_name,
    last_name,
    dob,
    role: findRole._id,
    street1,
    city,
    state,
    zip,
    phone1,
    phone2,
    fax,
    shift,
    timing,
    clinic_name,
    clinic_address,
  });
  const saved_user = await new_user.save();
  console.log('sa', saved_user);
  const result = await services.updateOneAndReturn(
    Organization,
    { organization_id },
    { $push: { users: saved_user._id }, $push: { roles: findRole._id } },
    {}
  );
  console.log('result', result);
  res.status(200).json({
    status: 'success',
    message: responseMessages.ADDED_SUCCESSFULLY,
    message_description: 'Doctor successfully added',
    user: saved_user,
    role: findRole,
  });
});
