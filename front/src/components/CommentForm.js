// CommentForm.js

import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'; // Assuming you're using Bootstrap for styling

const CommentForm = ({ onSubmit }) => {
  const [contenu, setContenu] = useState('');
  const [titre, setTitre] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ contenu, titre });
    setContenu('');
    setTitre('');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="contenu">
        <Form.Label>Content</Form.Label>
        <Form.Control 
          as="textarea"
          rows={3}
          value={contenu}
          onChange={(e) => setContenu(e.target.value)}
          placeholder="Enter your comment content"
          required
        />
      </Form.Group>
      <Form.Group controlId="titre">
        <Form.Label>Title</Form.Label>
        <Form.Control 
          type="text"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
          placeholder="Enter a title for your comment"
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default CommentForm;
