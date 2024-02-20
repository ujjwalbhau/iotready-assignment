import React, { useState, useEffect } from 'react';

const AudioPlayer = ({ playlist }) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
    const audioPlayer = document.getElementById('audioPlayer');
    audioPlayer.addEventListener('ended', handleTrackEnd);

    return () => {
      audioPlayer.removeEventListener('ended', handleTrackEnd);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (playlist.length > 0) {
      audioPlayer.src = URL.createObjectURL(playlist[currentTrackIndex]);
      audioPlayer.play();
    }
  }, [currentTrackIndex, playlist]);

  const handleTrackEnd = () => {
    setCurrentTrackIndex((prevIndex) =>
      prevIndex === playlist.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div>
      <audio id="audioPlayer" controls />
    </div>
  );
};

export default AudioPlayer;
