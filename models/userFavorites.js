module.exports = (sequelize, DataTypes) => {
    const UserFavorites = sequelize.define("UserFavorites", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        style_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    UserFavorites.associate = (models) => {
        UserFavorites.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });

        UserFavorites.belongsTo(models.Style, {
            foreignKey: "style_name", 
            targetKey: "style_name",
            onDelete: "CASCADE"
        });
    };

    return UserFavorites;
};
