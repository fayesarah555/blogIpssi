module.exports = (app) => {
    require('./user')(app)
    require('./commentaire')(app)
    require('./article')(app)
    require('./auth')(app)
    require('./role')(app)
}