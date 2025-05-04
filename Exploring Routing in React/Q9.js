import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to Home Page</h1>
    </div>
  );
};

const About = () => {
  return (
    <div>
      <h1>Welcome to About Page</h1>
    </div>
  );
};

const Contact = () => {
  return (
    <div>
      <h1>Welcome to Contact Page</h1>
    </div>
  );
};

const Navbar = () => {
  return (
    <nav>
      <ul style={{ display: 'flex', listStyle: 'none', gap: '10px' }}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    <Router>
      <div>
        {/* Navigation Bar */}
        <Navbar />

        {/* Routes */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
