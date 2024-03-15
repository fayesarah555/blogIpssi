module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: true
  });

  Article.associate = models => {
    Article.hasMany(models.Comment, { onDelete: 'CASCADE' });
  };
  Article.sync({ alter: true })
    .then(() => {
      console.log('Article model synced with database.');
    })
    .catch((error) => {
      console.error('Error syncing Article model with database:', error);
    });

  return Article; 
};
