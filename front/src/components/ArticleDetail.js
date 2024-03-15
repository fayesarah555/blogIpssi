import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import CommentForm from '../components/CommentForm';

const ArticleDetailPage = () => {
  const { articleId } = useParams();
  const [setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:3003/api/v1/articles/commentaires`, {
          method: 'GET'
        });
        if (response.ok) {
          const data = await response.json();
          setComments(data);
        } else {
          throw new Error('Failed to fetch comments');
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [articleId]);

  const handleCommentSubmit = async (commentData) => {
    try {
      await fetch(`http://localhost:3003/api/v1/articles/commentaires`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });
      // Refresh comments after posting a new comment
      const response = await fetch(`http://localhost:3003/api/v1/articles/commentaires`, {
        method: 'GET'
      });
      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        throw new Error('Failed to fetch comments after posting');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Article update</h1>
          
        </Col>
      </Row>
      <Row>
        <Col>
          <h2>Comments</h2>
          <CommentForm onSubmit={handleCommentSubmit} />
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleDetailPage;
