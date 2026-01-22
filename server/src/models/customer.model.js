module.exports = (sequelize, Sequelize) => {
    const Customer = sequelize.define("customers", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        phone: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "buyer"
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive', 'banned'),
            defaultValue: 'active'
        }
    });

    return Customer;
};
