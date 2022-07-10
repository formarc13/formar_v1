module.exports = (sequelize, dataTypes) => {
    let alias = "Cart";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      userId: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
    };
  
    let config = {
      tableName: "carts",
      timestamps: false,
    };
  
    const Cart = sequelize.define(alias, cols, config);
  
    Cart.associate = (models) => {
      Cart.belongsTo(models.User, {
        as: "user",
        foreignKey: "userId",
      });
      Cart.hasMany(models.CartItem, {
        as: "items",
        foreignKey: "cartId"
    })
    };
  
    return Cart;
  };
  