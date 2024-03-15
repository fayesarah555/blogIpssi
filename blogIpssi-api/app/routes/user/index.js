const userRoute = require('express').Router(),
    userController = require('../../controller/user');
    const {checkRole} = require("../../config/jwtConfig");
    const {checkIsAuth} = require("../../config/jwtConfig");

module.exports = (app) => {
    userRoute.get('/users',checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'), userController.getAll)
    userRoute.post('/user',checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'),userController.create)
    userRoute.put('/user/:uuid',checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'), userController.update)
    userRoute.delete('/user/:uuid',checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'),userController.delete)
    userRoute.get('/user/:uuid',checkRole('638665da-7da7-43a3-ae14-bc5f3a1a01a0'),userController.getById)
    app.use('/api/v1', userRoute)
}