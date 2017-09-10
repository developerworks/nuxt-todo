const {regenerateHash, generateHash, validPassword} = require('../../utils/password');

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

  userModel.prototype.generateHash = generateHash;
  userModel.prototype.validPassword = validPassword;

  userModel.beforeCreate(regenerateHash);
  userModel.beforeUpdate(regenerateHash);

  return userModel;
};
