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
        project_id: {
            type: dataTypes.INTEGER(11),
            allowNull: false,
        },
    }
    let config = {
        tableName: "projects_images",
        timestamps: false,
    }

    const ProjectImage = sequelize.define(alias, cols, config);


    return ProjectImage;
}