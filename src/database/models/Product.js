module.exports = (sequelize, dataTypes) => {
    let alias = "Product";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        price: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        discount: {
            type: dataTypes.INTEGER(11),
        },
        categoryId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        projectId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
        stock: {
            type: dataTypes.BOOLEAN,
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        },
    }
    let config = {
        tableName: "products",
        timestamps: false,
    }

    const Product = sequelize.define(alias, cols, config);

    Product.associate = (models) => {
        Product.belongsTo(models.Project, {
            as: "project",
            foreignKey: "projectId",
        })
        Product.belongsTo(models.Category, {
            as: "category",
            foreignKey: "categoryId",
        })
        Product.hasMany(models.ProductImage, {
            as: "productImages",
            foreignKey: "productId",
        })
        Product.hasMany(models.CartItem, {
            as: "cartItems",
            foreignKey: "productId",
        })
    }

    return Product;
}