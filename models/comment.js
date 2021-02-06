const { STRING } = require('sequelize');
const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            content: {
                type: Sequelize.STRING(200),
                allowNull: false,
            },
            up: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            down: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        });
    }

    static associate(db){
        db.Comment.belongsTo(db.Album);
        db.Comment.belongsTo(db.Annotation);
        db.Comment.belongsTo(db.Song);
        db.Comment.belongsTo(db.User);
    }
}