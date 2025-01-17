module.exports = function (sequelize, DataTypes) {
    var Exhibit = sequelize.define(
        "Exhibit",
        {
            exhibit_name: {
                type: DataTypes.STRING,
                allowNull: false, 
                validate: {
                    len: [1, 40], 
                },
            },
            date: {
                type: DataTypes.DATEONLY, 
                allowNull: false,
                validate: {
                    isDate: true, 
                },
            },
            time: {
                type: DataTypes.TIME, 
                allowNull: true,
            },
            exhibit_descript: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 500], 
                },
            },
            exhibit_image: {
                type: DataTypes.STRING,
                validate: {
                    isURL: true, 
                },
            },
            exhibit_address: {
                type: DataTypes.STRING,
                validate: {
                    len: [0, 255], 
                },
            },
        },
        {
            freezeTableName: true, 
            timestamps: true, 
        }
    );

    Exhibit.associate = (models) => {
        Exhibit.hasMany(models.UserBookmarks, {
            foreignKey: "exhibition_id",
            onDelete: "CASCADE",
        });
    };

    return Exhibit;
};