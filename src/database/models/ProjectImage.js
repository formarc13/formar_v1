module.exports = (sequelize, dataTypes) => {
    let alias = "ProjectImage";

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
        projectId: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        }
    };

    let config = {
        tableName: "projects_images",
        timestamps: false,
    };

    const ProjectImage = sequelize.define(alias, cols, config);

    ProjectImage.associate = (models) => {
        ProjectImage.belongsTo(models.Project, {
            as: "project",
            foreignKey: "projectId"
        })
    }

    return ProjectImage;
}