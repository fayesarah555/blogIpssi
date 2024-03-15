const { DataTypes } = require('sequelize')
const sequelize = require("../../config/db");
RoleModel = require('../role')

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    roleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: RoleModel,
            key: 'id'
        }
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    prenom: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isEnabled: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    token: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {timestamps: true})

User.belongsTo(RoleModel, {
    foreignKey: 'roleId',
    as: 'user_belongsTo_user',
    onDelete: "CASCADE", 
    onUpdate: "RESTRICT",  
})

RoleModel.hasMany(User, {
    foreignKey: 'roleId',
    as: 'role_hasMany_commentaire'
})
// User.sync({ force: true })

// update User table if exist without delete
// await User.sync({ alter: true });
// drop and create User table
// await User.sync({ force: true });
// create User table if not exist
module.exports = User
