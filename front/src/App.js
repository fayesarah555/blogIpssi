import React from 'react';
import { BrowserRouter as Routes,Router, Route } from 'react-router-dom';
import Home from './components/home';
import Login from './components/LoginForm';
import Register from './components/RegisterForm';
import ArticleDetailPage from './components/ArticleDetail';
import ArticleCreatePage from './components/ArticleCreatePage';

function App() {
  return (
    <Router>
    {/* <Routes> */}
      {/* <div className="App"> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/articles/:articleId" component={ArticleDetailPage} />
        <Route exact path="/create-article" component={ArticleCreatePage} />
      {/* </div> */}
    {/* </Routes> */}
     </Router>
  );
}

export default App;
