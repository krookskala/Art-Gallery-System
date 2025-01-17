module.exports = (sequelize, DataTypes) => {
    const UserBookmarks = sequelize.define("UserBookmarks", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        exhibition_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    });

    UserBookmarks.associate = (models) => {
        UserBookmarks.belongsTo(models.User, {
            foreignKey: "user_id",
            onDelete: "CASCADE"
        });

        UserBookmarks.belongsTo(models.Exhibit, {
            foreignKey: "exhibition_id",
            onDelete: "CASCADE"
        });
    };

    return UserBookmarks;
};
