var sequelize = require('./../../dbconnection/mysql/connection');
var Sequelize = require('sequelize');
//Create Item Table Structure
var Log = sequelize.define('Log', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    account_id: Sequelize.INTEGER, // ref to which account
    action_desc: Sequelize.STRING, // what user did with this product
    product_id: Sequelize.INTEGER, // ref to which product
    product_name: Sequelize.STRING
});

// force: true will drop the table if it already exists
Log.sync({force: false}).then(() => {
});

module.exports = Log;
