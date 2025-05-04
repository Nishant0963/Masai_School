import React, { useState, useEffect } from 'react';

function LoggingComponent() {
  useEffect(() => {
    console.log('Component Mounted');

    return () => {
      console.log('Component Unmounted');
    };
  }, []);

  return <div>I am the Logging Component</div>;
}

export default function ToggleComponent() {
  const [isVisible, setIsVisible] = useState(true);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div style={{ padding: '20px' }}>
      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} Component
      </button>
      <hr />
      {isVisible && <LoggingComponent />}
    </div>
  );
}
