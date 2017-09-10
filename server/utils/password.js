const bcrypt = require('bcryptjs');

function regenerateHash (user, options) {
  if (user.changed('password')) {
    user.password = user.generateHash(user.password);
  }
};

function generateHash (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

function validPassword (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = {
  regenerateHash,
  generateHash,
  validPassword
};
