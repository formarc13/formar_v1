module.exports = (sequelize, dataTypes) => {
    let alias = "Category";
    let cols = {
        id: {
            type: dataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: dataTypes.STRING(20),
            allowNull: false,
        },
    }
    let config = {
        tableName: "Categories",
        timestamps: false,
    }

    const Category = sequelize.define(alias, cols, config);


    return Category;
}