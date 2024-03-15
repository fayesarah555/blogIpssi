const articleRoute = require('express').Router(),
    articleController = require('../../controller/article');
const {checkIsAuth} = require("../../config/jwtConfig");
const {checkRole} = require("../../config/jwtConfig");
    

module.exports = (app) => {
    articleRoute.get('/articles',articleController.getAll)
    articleRoute.post('/article',checkIsAuth,checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'), articleController.create)
    articleRoute.put('/article/:uuid',checkIsAuth, articleController.update)
    articleRoute.delete('/article/:uuid',checkIsAuth,articleController.delete)
    articleRoute.get('/article/:uuid', articleController.getById)
    app.use('/api/v1', articleRoute)
}