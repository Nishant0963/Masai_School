import React from 'react';

const App = () => {
  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      margin: 0,
    },
    header: {
      backgroundColor: '#282c34',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
    },
    nav: {
      backgroundColor: '#444',
      display: 'flex',
      justifyContent: 'center',
      gap: '1rem',
      padding: '0.5rem',
    },
    link: {
      color: 'white',
      textDecoration: 'none',
      fontWeight: 'bold',
    },
    main: {
      flex: 1,
      padding: '2rem',
      backgroundColor: '#fff',
    },
    footer: {
      backgroundColor: '#222',
      color: '#ccc',
      textAlign: 'center',
      padding: '1rem',
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>My Simple Webpage</h1>
      </header>

      <nav style={styles.nav}>
        <a href="#" style={styles.link}>Home</a>
        <a href="#" style={styles.link}>About</a>
        <a href="#" style={styles.link}>Contact</a>
      </nav>

      <main style={styles.main}>
        <h2>Welcome to My Website</h2>
        <p>This is a simple layout built with React and Vite in one page.</p>
      </main>

      <footer style={styles.footer}>
        &copy; {new Date().getFullYear()} My Webpage. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
