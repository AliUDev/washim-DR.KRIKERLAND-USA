const mongoose = require('mongoose');
const dbCollections = require('../config/db_collections');
const userRoles = require('../config/user_roles');
const { ObjectId } = mongoose.Schema.Types;
var aggregatePaginate = require('mongoose-aggregate-paginate-v2');
const USER = require('../model/User');

const PatientContact = mongoose.Schema(
  {
    first_name: {
      type: String,
    },
    related_user: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: dbCollections.USER.model,
      required: true,
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

    street_1: {
      type: String,
    },
    street_2: {
      type: String,
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
PatientContact.plugin(aggregatePaginate);
module.exports = mongoose.model(
  dbCollections.PATIENTCONTACT.model,
  PatientContact
);
