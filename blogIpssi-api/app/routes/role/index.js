const roleRoute = require('express').Router(),
    roleController = require('../../controller/role');
const {checkArticlePermission} = require("../../config/jwtConfig");
const {checkRole} = require("../../config/jwtConfig");

module.exports = (app) => {
    roleRoute.get('/roles',  roleController.getAll)
    roleRoute.post('/role', roleController.create)
    roleRoute.put('/role/:uuid', checkArticlePermission, roleController.update)
    roleRoute.delete('/role/:uuid',checkArticlePermission, roleController.delete)
    roleRoute.get('/role/:uuid', roleController.getById)
    app.use('/api/v1', roleRoute)
}