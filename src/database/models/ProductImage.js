module.exports = (sequelize, dataTypes) => {
    let alias = "ProductImage";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        imageName: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        product_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: "products_images",
        timestamps: false,
    }

    const ProductImage = sequelize.define(alias, cols, config);


    return ProductImage;
}