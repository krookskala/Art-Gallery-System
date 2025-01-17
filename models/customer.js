module.exports = function(sequelize, DataTypes) {
    const Customer = sequelize.define("Customer", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 50],
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /^[\d\s\-+()]+$/,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        preferredStyle: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 100],
            },
        },
        preferredColor: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 100],
            },
        },
        preferredMedium: {
            type: DataTypes.STRING,
            validate: {
                len: [0, 100],
            },
        },
        preferredSize: {
            type: DataTypes.STRING,
        },
    }, {
        freezeTableName: true,
        timestamps: false,
    });

    return Customer;
};