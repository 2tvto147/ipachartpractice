import { useState } from "react";

// IPACard.jsx
export default function IPACard({ symbol, example, audioSrc }) {

    const [isPlaying, setIsPlaying] = useState(false);

    const playSound = () => {
        if (isPlaying) return; // ignore clicks while audio is playing
        
        const audio = new Audio(audioSrc);
        setIsPlaying(true);
        audio.play();

        audio.play().catch(err => {
            console.error("Audio failed to play:", err);
            setIsPlaying(false); // allow retry if audio fails
        });
        
        audio.onended = () => setIsPlaying(false);
  };

  return (
    <div className="ipa-card" onClick={playSound}>
      <div className="ipa-symbol">{symbol}</div>
      <div className="ipa-example center-text">{example}</div>
    </div>
  );
}
