const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            nickname: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: true,
            }, 
            name: {
                type: Sequelize.STRING(10),
                allowNull: false,
                unique: false,
            },
            email: {
                type: Sequelize.STRING(40),
                allowNull: false,
                unique: true,
            },
            emailVerification: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            //인증 코드
            emailVerifyKey: {
                type: Sequelize.STRING(140),
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defaultValue: 'local',
            },
            snsID: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        }, {
            sequelize,
            timestamps: true,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    
    static associate(db){
        db.User.hasMany(db.Song, {foreignKey: 'createUser'});
        db.User.hasMany(db.Lyrics, {foreignKey: 'createUser'});
    }
}