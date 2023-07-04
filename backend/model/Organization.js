const mongoose = require('mongoose');
const dbCollections = require('../config/db_collections');

const { ObjectId } = mongoose.Schema.Types;

const Organization = mongoose.Schema(
  {
    organization_id: {
      type: String,
      unique: true,
    },
    users: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: dbCollections.USER.model,
      },
    ],
    roles: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: dbCollections.ROLE.model,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model(dbCollections.ORGANIZATION.model, Organization);
