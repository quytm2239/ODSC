var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Product = sequelize.define('Product', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    category_id: Sequelize.INTEGER, //ref to which category
    name: Sequelize.INTEGER,
    desc: Sequelize.STRING, // description of this product
    quantity: Sequelize.INTEGER, // total amount base on unit
    unit: Sequelize.STRING, // counting unit: m2, kg,...
});

// force: true will drop the table if it already exists
Product.sync({force: false}).then(() => {
});

module.exports = Product;
