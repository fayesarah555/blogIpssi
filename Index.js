const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('./Config/db');
const dotenv = require("dotenv").config();
const articleRoutes = require('./Routes/routes');
const commentRoutes = require('./Routes/routes');
var cors = require('cors')


const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT;




app.use('/articles', articleRoutes);
app.use('/articles/:articleId/comments', commentRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
