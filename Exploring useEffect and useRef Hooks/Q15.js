import React, { useRef } from "react";

export default function VideoPlayer() {
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleRestart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <video
        ref={videoRef}
        width="600"
        controls={false}
        style={{ border: "1px solid #ccc" }}
      >
        <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePlay}>Play</button>
        <button onClick={handlePause} style={{ marginLeft: "10px" }}>Pause</button>
        <button onClick={handleRestart} style={{ marginLeft: "10px" }}>Restart</button>
      </div>
    </div>
  );
}
