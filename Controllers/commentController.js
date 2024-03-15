const { Comment } = require('../Models');

async function createComment(req, res) {
  try {
    const { articleId } = req.params;
    const { content } = req.body;
    const comment = await Comment.create({ content, ArticleId: articleId });
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCommentsByArticleId(req, res) {
  try {
    const { articleId } = req.params;
    const comments = await Comment.findAll({ where: { ArticleId: articleId } });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { content } = req.body;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    comment.content = content;
    await comment.save();
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: 'Comment not found' });
    }
    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createComment,
  getCommentsByArticleId,
  updateComment,
  deleteComment
};
