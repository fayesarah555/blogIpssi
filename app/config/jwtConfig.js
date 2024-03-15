const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const ArticleModel = require('../models/article');
const CommentaireModel = require('../models/commentaire');

const jwtSign = async (payload) => {
    try {
        return jwt.sign(payload, process.env.SECRET_PASS, {
            expiresIn: '1d'
        });
    } catch (e) {
        return e.message;
    }
};

const recupToken = (req) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        return token;
    }
    return null;
};

const jwtVerify = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.SECRET_PASS);
        if (decoded.exp < Date.now() / 1000) {
            return false; // token expiré
        }
        const user = await UserModel.findByPk(decoded.id);
        if (!user || user.token !== token) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e.message);
        return false;
    }
};

const checkIsAuth = async (req, res, next) => {
    try {
        if (req.originalUrl.includes(process.env.API_PATH)) {
            const authHeader = req.headers['authorization'];
            if (!authHeader) {
                return res.status(401).json({ msg: 'Authorization header missing' });
            }
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, process.env.SECRET_PASS);
            
            req.user = {
                id: decoded.id,
                email: decoded.email,
                roleId: decoded.roleId
            };
            
            next();
        } else {
            next();
        }
    } catch (e) {
        console.log(e.message);
        return res.status(400).json({ msg: 'BAD REQUEST' });
    }
};

const checkRole = (roleId) => async (req, res, next) => {
    try {
        // Vérifie d'abord l'authentification de l'utilisateur
        await checkIsAuth(req, res, async () => {
            // Si l'utilisateur est authentifié, continuez à vérifier le rôle
            if (req.user.roleId !== roleId) {
                console.log("Rôle non autorisé");
                return res.status(403).json({ msg: 'Vous n\'avez pas les permissions' });
            }
            next();
        });
    } catch (error) {
        console.error('Erreur lors de la vérification du rôle:', error.message);
        return res.status(500).json({ msg: 'Erreur Interne du Serveur' });
    }
};

const checkPermission = (model) => async (req, res, next) => {
    let urlId;
    const token = recupToken(req);

    try {
        // Vérifie d'abord l'authentification de l'utilisateur
        await checkIsAuth(req, res, async () => {
            // Extraire l'ID de l'URL
            urlId = req.params.urlId;
            console.log("urlId extrait :", urlId);

            if (!urlId) {
                console.log("ID de l'URL manquant");
                return res.status(400).json({ msg: 'ID de l\'URL manquant' });
            }

            const decoded = jwt.verify(token, process.env.SECRET_PASS);
            const contenu = await model.findByPk(urlId);

            console.log("urlId :", urlId);
            console.log("Contenu trouvé :", contenu);

            if (!contenu) {
                return res.status(404).json({ msg: 'Contenu non trouvé' });
            }

            next();
        });
    } catch (error) {
        console.error('Erreur lors de la vérification:', error.message);
        return res.status(500).json({ msg: 'Vous n\'avez pas la permission' });
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
};
