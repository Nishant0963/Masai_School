import React, { useState, createContext, useContext } from 'react';

// 1️⃣ Create the Theme Context
const ThemeContext = createContext();

// 2️⃣ Create a ThemeProvider to hold state and toggle logic
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () =>
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 3️⃣ A deeply nested component consuming the theme
const NestedComponent = () => {
  const { theme } = useContext(ThemeContext);
  const style = {
    padding: '20px',
    marginTop: '20px',
    backgroundColor: theme === 'light' ? '#f9f9f9' : '#333',
    color: theme === 'light' ? '#000' : '#fff',
    borderRadius: '8px',
  };

  return <div style={style}>I am a nested component using "{theme}" theme!</div>;
};

// 4️⃣ App component with toggle button
const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    minHeight: '100vh',
    padding: '30px',
    backgroundColor: theme === 'light' ? '#fff' : '#121212',
    color: theme === 'light' ? '#000' : '#fff',
    transition: 'all 0.3s ease',
  };

  return (
    <div style={appStyle}>
      <h1>React Context API - Theme Toggle</h1>
      <button onClick={toggleTheme}>
        Toggle Theme ({theme === 'light' ? '🌞' : '🌙'})
      </button>
      <NestedComponent />
    </div>
  );
};

// 5️⃣ Wrap App with ThemeProvider
const Root = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default Root;
