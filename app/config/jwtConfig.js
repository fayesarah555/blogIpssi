const jwt = require('jsonwebtoken');
const UserModel = require('../models/user')
const ArticleModel = require('../models/article');
const CommentaireModel = require('../models/commentaire');

const jwtSign = async (payload) => {
    try {
        return jwt.sign(payload, process.env.SECRET_PASS, {
            expiresIn: '1d'
        })
    } catch (e) {
        return e.message
    }
}

const jwtVerify = async (token) => {
    try {
        // décoder le token et obtenir le payload
        const decoded =  jwt.verify(token, process.env.SECRET_PASS);
        // vérifie la date d'expiration
        if (decoded.exp < Date.now() / 1000) {
            return false // token expiré
        }
        const user = await UserModel.findByPk(decoded.id)
        if (user.dataValues.token !== token) return false
        // return !!user // token valide
        return true
    }
    catch (e) {
        console.log(e.message)
        return false
    }
}

const checkIsAuth = async (req, res, next) => {
    try {
        if(req.originalUrl.includes(process.env.API_PATH)){
            const authHeader = req.headers['authorization']
            const token = authHeader.split(" ")[1]
            const isValid = await jwtVerify(token)
            if (!isValid){
                return res.status(401).json({msg: 'Unauthorized'})
            }
            next()
        } else {
            next()
        }
    } catch (e) {
        console.log(e.message)
        return res.status(400).json({msg: 'BAD REQUEST'})
    }
}
const checkRole = (roleId) => async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({ msg: 'Unauthorized: User not authenticated' });
        }
        if (req.user.roleId !== roleId) {
            return res.status(403).json({ msg: 'Forbidden: Insufficient permissions' });
        }
        next();
    } catch (error) {
        console.error('Error checking role:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};
const checkPermission = (model) => async (req, res, next) => {
    const { userId } = req.user; 
    const { urlId } = req.params;

    try {
        const contenu = await model.findByPk(urlId);

        if (!contenu) {
            return res.status(404).json({ msg: 'contenu not found' });
        }

        if (contenu.userId !== userId) {
            return res.status(403).json({ msg: 'Forbidden: Vous n\'etes pas l\'auteur de ce contenu' });
        }

        next();
    } catch (error) {
        console.error('Error checking contenu ownership:', error.message);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const checkArticlePermission = checkPermission(ArticleModel);
const checkCommentairePermission = checkPermission(CommentaireModel);


module.exports = {
    jwtSign,
    jwtVerify,
    checkIsAuth,
    checkRole,
    checkPermission,
    checkCommentairePermission,
    checkArticlePermission
}