module.exports = function(sequelize, DataTypes) {
  const Artist = sequelize.define("Artist", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    artist_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 40],
      },
    },
    artist_phone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isNumeric: true,
        len: [9, 15],
      },
    },
    artist_email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    artist_bio: {
      type: DataTypes.TEXT,
      validate: {
        len: [0, 2000],
      },
    },
    artist_portrait: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  }, {
    freezeTableName: true,
    timestamps: true,
  });

  Artist.associate = function(models) {
    Artist.hasMany(models.Artwork, {
      foreignKey: "artist_name",
      sourceKey: "artist_name",
      onDelete: "CASCADE",
    });
  };

  Artist.associate = (models) => {
    Artist.hasMany(models.UserFavorites, {
      foreignKey: "item_id",
      constraints: false,
    });
  };

  return Artist;
};