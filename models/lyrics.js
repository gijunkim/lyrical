const Sequelize = require('sequelize');

module.exports = class Lyrics extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            start: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            end: {
                type: Sequelize.INTEGER.UNSIGNED,
                allowNull: false,
            },
            description: {
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
        db.Lyrics.belongsTo(db.User, {foreignKey: 'createUser'});
        db.Lyrics.belongsTo(db.Song, {foreignKey: 'songId'});
    }
}