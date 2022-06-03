module.exports = (sequelize, dataTypes) => {
  let alias = "Address";

  let cols = {
    id: {
      type: dataTypes.INTEGER(11),
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: dataTypes.INTEGER(11),
      allowNull: false,
    },
    street: {
      type: dataTypes.STRING(50),
      allowNull: false,
    },
    number: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    province: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: dataTypes.STRING,
      allowNull: false,
    },
  };

  let config = {
    tableName: "addresses",
    timestamps: false,
  };

  const Address = sequelize.define(alias, cols, config);

  Address.associate = (models) => {
    Address.belongsTo(models.User, {
      as: "user",
      foreignKey: "user_id",
    });
  };

  return Address;
};
