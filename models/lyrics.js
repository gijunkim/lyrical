const Sequelize = require('sequelize');

module.exports = class Lyrics extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            lyrics: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Lyrics',
            tableName: 'lyrics',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Lyrics.hasOne(db.Song);
    }
}