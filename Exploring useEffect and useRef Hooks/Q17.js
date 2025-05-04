import React, { useState, useEffect } from "react";

export default function RandomNumberLogger() {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log(`State updated: ${number}`);
  }, [number]); // Triggers only when `number` changes

  const handleClick = () => {
    const randomNum = Math.floor(Math.random() * 100);
    setNumber(randomNum);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Current Number: {number}</h2>
      <button onClick={handleClick}>Generate Random Number</button>
    </div>
  );
}
