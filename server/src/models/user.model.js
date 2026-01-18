module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        role: {
            type: Sequelize.ENUM('super_admin', 'admin', 'manager'),
            defaultValue: 'admin'
        }
    });

    return User;
};
