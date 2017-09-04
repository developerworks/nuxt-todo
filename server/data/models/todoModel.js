module.exports = (sequelize, DataTypes) => {
  return sequelize.define('todo', {
    title: DataTypes.STRING,
    text: DataTypes.TEXT
  });
};
