const { Article } = require('../Models');

async function createArticle(req, res) {
  try {
    const { title, content, author } = req.body;
    const article = await Article.create({ title, content, author });
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllArticles(req, res) {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getArticleById(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content, author } = req.body;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    article.title = title;
    article.content = content;
    article.author = author;
    await article.save();
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createArticle,
  getAllArticles,
  getArticleById,
  updateArticle,
  deleteArticle
};
