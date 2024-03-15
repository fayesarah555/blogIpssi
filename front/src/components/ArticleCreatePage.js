// Import React and other necessary modules
import React, { useState, useEffect } from 'react';
import "./ARticle.css"
function ArticleCreatePage() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://example.com/api/articles', {
          method: 'GET', 
        });
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.log(error.message);
      } 
    };

    fetchData();
  }, []);

  

  return (
    <div>
      {/* Render the fetched data here */}
      {data && (
        <ul>
          {data.map((article) => (
            <li key={article.id}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <p>Author: {article.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ArticleCreatePage;
