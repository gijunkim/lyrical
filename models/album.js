const Sequelize = require('sequelize');

module.exports = class Album extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            title: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            url: {
                type: Sequelize.STRING(150),
                allowNull: false,
            },
            //additional
            cover: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            release: {
                type: Sequelize.DATEONLY,
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Album',
            tableName: 'albums',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        db.Album.hasMany(db.Song);

        db.Album.belongsTo(db.Artist);

        db.Album.hasMany(db.Comment);
    }
}