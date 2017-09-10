module.exports = (sequelize, DataTypes) => {
  return sequelize.define('todo', {
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });
};
