const articleModel = require('../../models/article')

exports.getAll = async (req, res) => {
    return res.status(200).json({ msg: 'OK', articles: await articleModel.findAll()})
}

exports.create = async (req, res) => {
    // get body content of request
    const { contenu, titre, userId } = req.body
    try {
        const article = await articleModel.create({
            contenu,
            titre,
            userId
        })
        if (!article.id){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', article: article.dataValues})
        // return article.id ? res.status(200).json({ msg: 'OK', article}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.update = async (req, res) => {
    try {
        const { uuid } = req.params;

        if (!uuid) {
            return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED' });
        }

        const { contenu, titre } = req.body;
        const [updated] = await articleModel.update(
            { contenu, titre },
            { where: { id: uuid } }
        );

        if (!updated) {
            return res.status(404).json({ msg: 'Article non trouvé' });
        }
        const updatedArticle = await articleModel.findByPk(uuid);

        return res.status(200).json({ msg: 'OK', article: updatedArticle });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ msg: 'Erreur lors de la mise à jour de l\'article' });
    }
};

exports.delete = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        const article = await articleModel.destroy( {where: { id: uuid}})
        console.log(article)
        if (!article){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK'})
        // return article.id ? res.status(200).json({ msg: 'OK', article}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}

exports.getById = async (req, res) => {
    if (!req.params.uuid) return res.status(400).json({ msg: 'BAD REQUEST PARAMS IS REQUIRED'})
    const { uuid } = req.params
    try {
        // const article = await articleModel.findByPk(uuid)
        const article = await articleModel.findOne({
            include: [
                {
                association: 'article_belongsTo_user', // alias = as
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
        console.log(article.dataValues)
        if (!article){
            res.status(400).json({ msg: 'BAD REQUEST'})
        }
        return res.status(200).json({ msg: 'OK', article: article.dataValues})
        // return article.id ? res.status(200).json({ msg: 'OK', article}) : res.status(400).json({ msg: 'BAD REQUEST'})
    } catch (e) {
        console.error(e.message)
        res.status(400).json({ msg: 'BAD REQUEST' + e.message})
    }
}
