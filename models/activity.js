module.exports = (sequelize, DataTypes) => {
    const Activity = sequelize.define("Activity", {
        users_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        action: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        details: {
            type: DataTypes.STRING,
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    });

  Activity.associate = (models) => {
    Activity.belongsTo(models.User, {
      foreignKey: "users_id", 
      onDelete: "CASCADE",
    });
  };

    return Activity;
};