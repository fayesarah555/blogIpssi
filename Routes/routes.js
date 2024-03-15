const express = require('express');
const router = express.Router();
const articleController = require('../Controllers/articleController');
const commentController = require('../Controllers/commentController');

router.post('/', articleController.createArticle);
router.get('/', articleController.getAllArticles);
router.get('/:id', articleController.getArticleById);
router.put('/:id', articleController.updateArticle);
router.delete('/:id', articleController.deleteArticle);

router.post('/:articleId', commentController.createComment);
router.get('/:articleId', commentController.getCommentsByArticleId);
router.put('/:id', commentController.updateComment);
router.delete('/:id', commentController.deleteComment);

module.exports = router;


