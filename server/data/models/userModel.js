module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.TEXT
  });
};
