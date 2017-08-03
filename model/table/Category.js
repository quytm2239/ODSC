var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Category = sequelize.define('Category', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    type: Sequelize.INTEGER // 1st, 2nd, 3rd to filter
});

// force: true will drop the table if it already exists
Category.sync({force: false}).then(() => {
});

module.exports = Category;
