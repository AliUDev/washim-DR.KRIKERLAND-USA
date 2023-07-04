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
const PatientContact = require('../model/PatientContact');
const { find } = require('../model/User');

/**
 * POST
 * Add a new patient
 */

exports.addPatient = catchAsync(async (req, res, next) => {
  const {
    first_name,
    middle_name,
    last_name,
    ssn,
    gender,
    dob,
    street_1,
    street_2,
    city,
    state,
    zip,
    phone_1,
    fax,
    insurance_type,
    health_plan_number,
    group_number,
    member_id,
    MMIS_number,
    primary_care_number,
    primary_care_clinic,
    payer_id,
    rx_group,
    rx_bin,
    rx_pcn,
    covid_vaccinated,
    role,
    email,
    organization_id,
    pc_firstname,
    pc_lastname,
    pc_middlename,
    pc_email,
    pc_street1,
    pc_street2,
    pc_city,
    pc_state,
    pc_zip,
    pc_phone1,
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

  if (!street_1) {
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

  if (!fax) {
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
  console.log('herer');
  let findRole = await Role.findOne({
    title: role,
  });
  console.log('findRole', findRole);
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
  if (!findRole) {
    console.log('findRole12', findRole);
    const new_role = new Role({
      title: role,
      permissions: Permissions.permissions,
    });

    findRole = await new_role.save();
  }
  console.log('findRole125767', findRole);
  console.log('here i am hsdhshd');
  const new_user = new User({
    first_name,
    middle_name,
    last_name,
    ssn,
    gender,
    dob,
    street_1,
    street_2,
    city,
    state,
    zip,
    phone_number1: phone_1,
    fax,
    insurance_type,
    health_plan_number,
    group_number,
    member_id,
    MMIS_number,
    primary_care_number,
    primary_care_clinic,
    payer_id,
    rx_group,
    rx_bin,
    rx_pcn,
    organization_id,
    email,
    role: findRole._id,
  });
  const saved_user = await new_user.save();
  const contact_person = new PatientContact({
    first_name: pc_firstname,
    last_name: pc_lastname,
    middle_name: pc_middlename,
    email: pc_email,
    street_1: pc_street1,
    street_2: pc_street2,
    city: pc_city,
    state: pc_state,
    zip: pc_zip,
    phone_number1: pc_phone1,
    related_user: saved_user._id,
  });
  const saved_ontact_person = await contact_person.save();
  res.status(200).json({
    status: 'success',
    message: responseMessages.ADDED_SUCCESSFULLY,
    message_description: 'Doctor successfully added',
    user: saved_user,
    role: findRole,
  });
});
