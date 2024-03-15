const commentaireRoute = require('express').Router(),
    commentaireController = require('../../controller/commentaire');

module.exports = (app) => {
    commentaireRoute.get('/commentaires',  commentaireController.getAll)
    commentaireRoute.post('/commentaire', commentaireController.create)
    commentaireRoute.put('/commentaire/:uuid', commentaireController.update)
    commentaireRoute.delete('/commentaire/:uuid',commentaireController.delete)
    commentaireRoute.get('/commentaire/:uuid', commentaireController.getById)
    app.use('/api/v1', commentaireRoute)
}