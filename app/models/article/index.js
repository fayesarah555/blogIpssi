const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db"),
    UserModel = require('../user')

const Article = sequelize.define('Article', {
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
}, {timestamps: true})

Article.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'article_belongsTo_user',
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT",  
})

UserModel.hasMany(Article, {
    foreignKey: 'userId',
    as: 'user_hasMany_article'
})

//Product.sync({ force: true })
// update User table if exist without delete
// await Product.sync({ alter: true });
// drop and create User table
// await Product.sync({ force: true });
// create User table if not exist
module.exports = Article