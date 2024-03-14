module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
      content: DataTypes.TEXT
    });
  
    Comment.associate = (models) => {
      Comment.belongsTo(models.Article);
    };
  
    return Comment;
  };
  