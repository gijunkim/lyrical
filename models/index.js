const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const User = require('./user');
const Song = require('./song');
const Artist = require('./artist');
const Annotation = require('./annotation');

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
db.Song = Song;
db.Artist = Artist;
db.Annotation = Annotation;

db.User.init(sequelize);
db.Song.init(sequelize);
db.Artist.init(sequelize);
db.Annotation.init(sequelize);

db.User.associate(db);
db.Song.associate(db);
db.Artist.associate(db);
db.Annotation.associate(db);

module.exports = db;
