const { truncate } = require('lodash');
const mongoose = require('mongoose');
const dbCollections = require('../config/db_collections');
const { ObjectId } = mongoose.Schema.Types;

const Role = mongoose.Schema(
  {
    title: {
      type: String,
      unique: truncate,
    },
    // organization_id: {
    //   type: String,
    // },
    permissions: {
      type: Object,
    },
    active: {
      type: Number,
      default: 1,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model(dbCollections.ROLE.model, Role);
