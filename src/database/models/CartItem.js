module.exports = (sequelize, dataTypes) => {
    let alias = "CartItem";
  
    let cols = {
      id: {
        type: dataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      cartId: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      productId: {
        type: dataTypes.INTEGER(11),
        allowNull: false,
      },
      quantity: {
        type: dataTypes.INTEGER(11),
        allowNull: false 
      }
    };
  
    let config = {
      tableName: "cart_items",
      timestamps: false,
    };
  
    const CartItem = sequelize.define(alias, cols, config);
  
    CartItem.associate = (models) => {
      CartItem.belongsTo(models.Cart, {
        as: "cart",
        foreignKey: "cartId",
      });
      CartItem.belongsTo(models.Product, {
        as:"products",
        foreignKey: "productId"
    })
    };
  
    return CartItem;
  };