const mongoose = require('mongoose');
const dbCollections = require('../config/db_collections');
const userRoles = require('../config/user_roles');
const { ObjectId } = mongoose.Schema.Types;
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');

const User = mongoose.Schema(
  {
    organization_id: {
      type: String,
    },
    role: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: dbCollections.ROLE.model,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          return /^[A-Za-z0-9._]+$/.test(v || '');
        },
        message: () => {
          return `Username should only contain alphabets numbers _ and .`;
        },
      },
    },
    first_name: {
      type: String,
    },
    otp: {
      type: String,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    auth: {
      type: Boolean,
      default: false,
    },
    last_name: {
      type: String,
      trim: true,
    },
    middle_name: {
      type: String,
      trim: true,
    },
    dob: {
      type: Date,
    },
    timing: {
      type: String,
    },
    clinic_name: {
      type: String,
    },
    shift: {
      type: String,
    },
    address: {
      type: String,
    },
    clinic_phone: {
      type: String,
    },
    gender: {
      type: String,
    },

    SSN: {
      type: String,
      trim: true,
    },
    doc_type: {
      type: String,
    },

    business_name: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    phone_number1: {
      type: Number,
    },
    phone_number2: {
      type: Number,
    },
    street_1: {
      type: String,
    },
    street_2: {
      type: String,
    },
    fax: {
      type: String,
    },
    insurance_type: {
      type: String,
    },
    health_plan_number: {
      type: String,
    },
    group_number: {
      type: String,
    },
    member_id: {
      type: String,
    },
    MMIS_number: {
      type: String,
    },
    primary_care_name: {
      type: String,
    },
    primary_care_clinic: {
      type: String,
    },
    primary_care_number: {
      type: String,
    },
    payer_id: {
      type: String,
    },
    rx_group: {
      type: String,
    },
    rx_bin: {
      type: String,
    },
    px_pcn: {
      type: String,
    },

    profile_image: {
      type: String,
      trim: true,
    },
    custom_image: {
      type: Boolean,
      default: false,
    },
    covid_vacinated: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v || ''
          );
        },
        message: () => {
          return `Email is invalid!`;
        },
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    password: { type: String, trim: true },
  },
  { timestamps: true }
);
User.plugin(aggregatePaginate);
module.exports = mongoose.model(dbCollections.USER.model, User);
