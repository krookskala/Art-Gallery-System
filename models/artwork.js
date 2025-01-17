module.exports = function(sequelize, DataTypes) {
    const Artwork = sequelize.define("Artwork", {
        artwork_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100],
            },
        },
        style_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artist_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        artwork_size: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artwork_descript: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        artwork_medium: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artwork_colorTone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artwork_price: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artwork_image: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        artwork_publicID: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    }, {
        freezeTableName: true,
        timestamps: true
    });

    Artwork.associate = function(models) {
        Artwork.belongsTo(models.Style, {
            foreignKey: "style",
            targetKey: "style_name",
            onDelete: "CASCADE",
        });

        Artwork.belongsTo(models.Artist, {
            foreignKey: "artist", 
            targetKey: "artist_name",
            onDelete: "CASCADE",
        });
    };

    return Artwork;
};