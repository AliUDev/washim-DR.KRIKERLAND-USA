const { randomString, randomInRange } = require('make-random');

module.exports = async function getNonce() {
  return await randomString(6);
};
