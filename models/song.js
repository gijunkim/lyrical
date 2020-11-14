const Sequelize = require('sequelize');

module.exports = class Song extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            cover: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            aboutSong: {
                type: Sequelize.STRING(140),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Song',
            tableName: 'songs',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Song.belongsTo(db.User, {foreignKey: 'createUser'});
        db.Song.hasMany(db.Lyrics, {foreignKey: 'songId'});
        db.Song.belongsToMany(db.Artist, {through: 'SongArtist', as: 'Artists'});
    }
}