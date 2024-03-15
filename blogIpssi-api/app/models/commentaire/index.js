const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user'),
    ArticleModel = require('../article')

const Commentaire = sequelize.define('Commentaire', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    contenu: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    titre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: UserModel,
            key: 'id'
        }
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    articleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ArticleModel,
            key: 'id'
        }
    }
}, {timestamps: true})

Commentaire.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'commentaire_belongsTo_user',
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT",  
})

UserModel.hasMany(Commentaire, {
    foreignKey: 'userId',
    as: 'user_hasMany_commentaire'
})

//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Commentaire