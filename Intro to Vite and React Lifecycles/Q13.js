import React, { useState, useEffect } from 'react';

function CounterApp() {
  const [counter, setCounter] = useState(0);

  // Log the counter value to the console every time it changes
  useEffect(() => {
    console.log(`Counter value: ${counter}`);
  }, [counter]); // Dependency array ensures effect runs when counter changes

  const increment = () => setCounter(prevCounter => prevCounter + 1);
  const decrement = () => setCounter(prevCounter => prevCounter - 1);
  const reset = () => setCounter(0);

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Counter: {counter}</h2>
        <div style={styles.buttonContainer}>
          <button onClick={increment} style={styles.button}>Increment</button>
          <button onClick={decrement} style={styles.button}>Decrement</button>
          <button onClick={reset} style={styles.button}>Reset</button>
        </div>
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
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: '1rem',
  },
  button: {
    margin: '0 10px',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    border: 'none',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default CounterApp;
