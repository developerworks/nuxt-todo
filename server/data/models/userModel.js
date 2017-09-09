const bcrypt = require('bcryptjs');

function regenerateHash (user, options) {
  if (user.changed('password')) {
    user.password = user.generateHash(user.password);
  }
};

module.exports = (sequelize, DataTypes) => {
  const userModel = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  userModel.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  };
  userModel.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  userModel.beforeCreate(regenerateHash);
  userModel.beforeUpdate(regenerateHash);

  return userModel;
};
