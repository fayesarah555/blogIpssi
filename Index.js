const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./Config/db');
const dotenv = require("dotenv").config();
const articleRoutes = require('./Routes/routes');
// const commentRoutes = require('./routes/commentRoutes');
var cors = require('cors')


const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;


// const Article = require('./Models/Article')(sequelize, DataTypes);
// const Comment = require('./Models/Comment')(sequelize, DataTypes);


// Article.hasMany(Comment);
// Comment.belongsTo(Article);


sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });




app.use('/articles', articleRoutes);
// app.use('/articles/:articleId/comments', commentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
