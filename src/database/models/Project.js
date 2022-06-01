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
        user_id: {
            type: dataTypes.INTEGER(11),
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
        Project.belongsTo(models.User, {
            as: "user",
            foreignKey: "user_id"
        })
        Project.hasMany(models.ProjectImage, {
            as: "projectImages",
            foreignKey: "project_id"
        })
        Project.hasMany(models.Product, {
            as: "products",
            foreignKey: "project_id"
        })
    }

    return Project;
}