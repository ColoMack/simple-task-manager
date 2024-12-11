const { Sequelize } = require('sequelize');

// initialization of sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite',
});

module.exports = sequelize;