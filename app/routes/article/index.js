const express = require('express');
const articleRoute = express.Router();
const articleController = require('../../controller/article');
const { checkIsAuth, checkArticlePermission } = require("../../config/jwtConfig");

module.exports = (app) => {
    articleRoute.get('/articles', checkIsAuth, articleController.getAll);
    articleRoute.post('/article', checkIsAuth, articleController.create);
    articleRoute.get('/article/:uuid', articleController.getById);
    articleRoute.put('/article/:uuid',checkArticlePermission, articleController.update);
    articleRoute.delete('/article/:uuid',checkArticlePermission, articleController.delete);

    app.use('/api/v1', articleRoute);
};