import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArticleList from '../components/ArticleList';

function Home() {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3003/api/v1/articles', {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setArticles(data);
      } else {
        throw new Error('Failed to fetch articles');
      }
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Latest Articles</h1>
      <ArticleList articles={articles} />
      <Link to="/create-article" className="btn btn-primary">Create Article</Link>
    </div>
  );
}

export default Home;
