const Sequelize = require('sequelize');

module.exports = class Artist extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
            verified: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            aboutArtist: {
                type: Sequelize.TEXT,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Artist',
            tableName: 'artists',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Artist.hasOne(db.Song);

        db.Artist.belongsToMany(db.Song, { through: 'Feature', as: 'Featuring'});
        db.Artist.belongsToMany(db.Song, { through: 'Producer', as: 'Producing' });
        db.Artist.belongsToMany(db.Song, { through: 'Written', as: 'Writing'});
    }
}