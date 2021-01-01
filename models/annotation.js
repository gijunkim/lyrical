const Sequelize = require('sequelize');

module.exports = class Annotation extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            before: {
                type: Sequelize.STRING(10),
            },
            offset: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            length: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            lyrics: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            annotation: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            after: {
                type: Sequelize.STRING(10),
            }
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Annotation',
            tableName: 'annotations',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }

    static associate(db){
        //db.Annotation.belongsTo(db.Lyrics);
        db.Annotation.belongsTo(db.User);
        db.Annotation.belongsTo(db.Song);
    }
}