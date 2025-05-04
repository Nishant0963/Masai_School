import React, { useRef } from "react";

export default function OTPInput() {
  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^\d$/.test(value)) {
      // Allow only single digit, move to next input
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {[0, 1, 2, 3].map((i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          ref={(el) => (inputRefs.current[i] = el)}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          style={{
            width: "50px",
            height: "50px",
            fontSize: "24px",
            textAlign: "center",
          }}
        />
      ))}
    </div>
  );
}
