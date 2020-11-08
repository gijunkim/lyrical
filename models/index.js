const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const User = require('./user');

const db = {};
const sequelize = new Sequelize(
  config.database, config.username, config.password, 
  {
    host: config.host,
    dialect: config.dialect,
    port: 3306
});


db.sequelize = sequelize;
db.User = User;

db.User.init(sequelize);

db.User.associate(db);

module.exports = db;
