module.exports = (sequelize, DataTypes) => {
  return sequelize.define('todo', {
    text: DataTypes.TEXT
  });
};