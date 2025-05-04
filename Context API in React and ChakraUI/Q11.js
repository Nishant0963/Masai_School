import React, { useState } from 'react';

const BottomMainRight = ({ userName }) => (
  <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
    <p><strong>BottomMainRight Component:</strong></p>
    <p>User Name: {userName || 'Not entered yet'}</p>
  </div>
);

const BottomMain = ({ userName }) => (
  <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
    <h5>BottomMain Component</h5>
    <BottomMainRight userName={userName} />
  </div>
);

const MiddleMain = ({ userName }) => (
  <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
    <h4>MiddleMain Component</h4>
    <BottomMain userName={userName} />
  </div>
);

const TopMain = ({ userName }) => (
  <div style={{ border: '1px solid gray', padding: '10px', marginTop: '10px' }}>
    <h3>TopMain Component</h3>
    <MiddleMain userName={userName} />
  </div>
);

const App = () => {
  const [userName, setUserName] = useState('');

  return (
    <div style={{ padding: '20px' }}>
      <h2>Props Drilling Demo</h2>
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
      />
      <TopMain userName={userName} />
    </div>
  );
};

export default App;
