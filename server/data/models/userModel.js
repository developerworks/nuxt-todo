const bcrypt = require('bcryptjs');

function regenerateHash (user, options) {
  if (user.changed('password')) {
    user.password = user.generateHash(user.password);
  }
};

module.exports = (sequelize, DataTypes) => {
  const userModel = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  userModel.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  userModel.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.local.password);
  };

  userModel.beforeCreate(regenerateHash);
  userModel.beforeUpdate(regenerateHash);

  return userModel;
};
