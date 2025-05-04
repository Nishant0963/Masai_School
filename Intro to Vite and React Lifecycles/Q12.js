import React, { useState, useEffect } from 'react';

function RandomJokeCard() {
  const [joke, setJoke] = useState(null);
  const [reload, setReload] = useState(false); // Trigger for re-fetching

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        const res = await fetch('https://official-joke-api.appspot.com/random_joke');
        const data = await res.json();
        setJoke(data);
      } catch (error) {
        console.error('Failed to fetch joke:', error);
      }
    };

    fetchJoke();
  }, [reload]); // Dependency ensures useEffect runs again when `reload` changes

  const handleNewJoke = () => {
    setReload(prev => !prev); // Toggle value to trigger useEffect
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {joke ? (
          <>
            <h3>😂 {joke.setup}</h3>
            <p>{joke.punchline}</p>
          </>
        ) : (
          <p>Loading joke...</p>
        )}
        <button onClick={handleNewJoke} style={styles.button}>
          Get Another Joke
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    textAlign: 'center',
  },
  button: {
    marginTop: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default RandomJokeCard;
