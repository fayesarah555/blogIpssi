import React, { useState } from 'react';
import { Navigate} from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  // const history = useHistory();
  const [formData, setFormData] = useState({ nom: '',prenom: '', pseudo: '', password: '' ,roleId:'66d3f7f2-2d1e-4efa-aa12-c235cca81e3e'});

  const handleChange = event => {
    const { name, value } = event.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:3003/api/v1/register', formData);
      Navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <div>
      <h1>Registration Page</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="text"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleChange}
        />
      <input
          type="text"
          name="nom"
          placeholder="nom"
          value={formData.nom}
          onChange={handleChange}
        />
           <input
          type="text"
          name="prenom"
          placeholder="prenom"
          value={formData.prenom}
          onChange={handleChange}
        />
           <input
          type="text"
          name="pseudo"
          placeholder="pseudo"
          value={formData.pseudo}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
