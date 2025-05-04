import React, { useState, createContext, useContext } from 'react';

// 1️⃣ Create the Authentication Context
const AuthContext = createContext();

// 2️⃣ Create the AuthProvider to hold authentication state and logic
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleAuth = () => setIsAuthenticated((prev) => !prev);

  return (
    <AuthContext.Provider value={{ isAuthenticated, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3️⃣ Navbar Component
const Navbar = () => {
  const { isAuthenticated, toggleAuth } = useContext(AuthContext);
  return (
    <nav style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
      <h2>Navbar</h2>
      <button onClick={toggleAuth}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </button>
    </nav>
  );
};

// 4️⃣ Main Component
const Main = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <main style={{ padding: '20px' }}>
      <h2>Main Component</h2>
      <p>{isAuthenticated ? 'You are logged in!' : 'Please log in to continue.'}</p>
    </main>
  );
};

// 5️⃣ Footer Component
const Footer = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <footer style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white' }}>
      <p>{isAuthenticated ? 'Welcome, User' : 'Please log in'}</p>
    </footer>
  );
};

// 6️⃣ Root component wrapping everything with AuthProvider
const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Main />
      <Footer />
    </AuthProvider>
  );
};

export default App;
