const Sequelize = require('sequelize');

module.exports = class Song extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            // necessary
            title: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            songType: {
                type: Sequelize.ENUM,
                values: ['Rap', 'Pop', 'R&B', 'Rock', 'Country', 'Non-Music'],
                allowNull: false,
            },
            view: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },
            lyrics: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            // additional
            release: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
            soundcloud : {
                type: Sequelize.STRING(150),
                allowNull: true,
            },
            youtube : {
                type: Sequelize.STRING(150),
                allowNull: true,
            }
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
        db.Song.belongsTo(db.User);
        db.Song.belongsTo(db.Album);
        
        // artist
        db.Song.belongsTo(db.Artist);

        db.Song.belongsToMany(db.Artist, { through: 'Feature', as: 'Features'});
        db.Song.belongsToMany(db.Artist, { through: 'Producer', as: 'Producers'});
        db.Song.belongsToMany(db.Artist, { through: 'Written', as: 'Writers'});

        db.Song.hasMany(db.Annotation);
    }
}