const commentaireModel = require('../../models/commentaire')

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', commentaires: await commentaireModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { contenu, titre, articleId , userId } = req.body
    try {
        const commentaire = await commentaireModel.create({
            contenu,
            titre,
            articleId,
            userId
        })
        if (!commentaire.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', commentaire: commentaire.dataValues})
        // return commentaire.id ? res.status(200).json({ msg: 'OK', commentaire}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
        if (!req.body) return res.status(400).json({ msg: 'BAD REQUEST BODY IS REQUIRED'})
        const { contenu, titre} = req.body
        const { uuid } = req.params
        const commentaire = await commentaireModel.update({
            contenu,
            titre,
        }, {where: { id: uuid}})
        return res.status(200).json({ msg: 'OK', commentaire})
        // return commentaire.id ? res.status(200).json({ msg: 'OK', commentaire}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const commentaire = await commentaireModel.destroy( {where: { id: uuid}})
        console.log(commentaire)
        if (!commentaire){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return commentaire.id ? res.status(200).json({ msg: 'OK', commentaire}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const commentaire = await commentaireModel.findByPk(uuid)
        const commentaire = await commentaireModel.findOne({
            include: [
                {
                association: 'commentaire_belongsTo_user', // alias = as
                attributes: { exclude: [ 'createdAt', 'updatedAt', 'password' ] }
            }
            ],
            where: {id: uuid},
            attributes: {
                exclude: [
                    'createdAt'
                ]
            }
        })
        console.log(commentaire.dataValues)
        if (!commentaire){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', commentaire: commentaire.dataValues})
        // return commentaire.id ? res.status(200).json({ msg: 'OK', commentaire}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
