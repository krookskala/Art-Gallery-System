module.exports = function(sequelize, DataTypes) {
    const Style = sequelize.define("Style", {
        style_name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                len: [1, 100],
            },
        },
        style_description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    }, {
        freezeTableName: true,
        timestamps: true,
    });

    Style.associate = function(models) {
        Style.hasMany(models.Artwork, {
            foreignKey: "style_name", 
            onDelete: "CASCADE",
        });
    };

    return Style;
};