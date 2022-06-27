module.exports = (sequelize, dataTypes) => {
    let alias = "Project";

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
        address: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        phone: {
            type: dataTypes.STRING(45),
            allowNull: false,
        },
        description: {
            type: dataTypes.TEXT,
            allowNull: false,
        }
    };

    let config = {
        tableName: "projects",
        timestamps: false,
    };

    const Project = sequelize.define(alias, cols, config);

    Project.associate = (models) => {
        Project.hasMany(models.ProjectImage, {
            as: "projectImages",
            foreignKey: "projectId"
        })
        Project.hasMany(models.Product, {
            as: "products",
            foreignKey: "projectId"
        })
    }

    return Project;
}