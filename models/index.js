const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config.json')[env];

const User = require('./user');
const Song = require('./song');
const Artist = require('./artist');
const Lyrics = require('./lyrics');

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
db.Lyrics = Lyrics;

db.User.init(sequelize);
db.Song.init(sequelize);
db.Artist.init(sequelize);
db.Lyrics.init(sequelize);

db.User.associate(db);
db.Song.associate(db);
db.Artist.associate(db);
db.Lyrics.associate(db);

module.exports = db;
