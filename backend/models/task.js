const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.ENUM('To Do', 'In Progress', 'Completed'),
        defaultValue: 'To Do',
    },
    priority: {
        type: DataTypes.ENUM('Low', 'Medium', 'High'),
        defaultValue: 'Medium',
    },
    dueDate: {
        type: DataTypes.DATE,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = Task;