import React from 'react';

const Playlist = ({ playlist, onFileUpload }) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    onFileUpload(file);
  };

  return (
    <div>
      <h2>Playlist</h2>
      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <ul>
        {playlist.map((file, index) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
