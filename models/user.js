var bcrypt = require("bcryptjs");

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user"
    }
  });

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.addHook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  User.associate = (models) => {
    User.hasMany(models.Activity, {
      foreignKey: "user_id", 
      onDelete: "CASCADE"
    });

    User.hasMany(models.UserBookmarks, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });

    User.hasMany(models.UserFavorites, {
      foreignKey: "user_id",
      onDelete: "CASCADE"
    });
  };

  return User;
};