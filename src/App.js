


// import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
// import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
// import { IconContext } from "react-icons";
// import './App.css'
// import React, { useState } from 'react';
// import AudioPlayer from './Components/AudioPlayer';
// import Playlist from './Components/Playlist';

// const App = () => {
//   const [playlist, setPlaylist] = useState([]);

//   const handleFileUpload = (file) => {
//     setPlaylist([...playlist, file]);
//   };

//   return (
//     <div>
//       <h1>Audio Player</h1>
//       <Playlist playlist={playlist} onFileUpload={handleFileUpload} />
//       <AudioPlayer playlist={playlist} />
      
//     </div>
//   );
// };

// export default App;


import React from 'react'
import { useState, useEffect } from 'react';
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai"; // icons for play and pause
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"; // icons for next and previous track
import { IconContext } from "react-icons";
import './App.css'
const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  useEffect(() => {
      const lastPlayedTrackIndex = parseInt(localStorage.getItem('lastPlayedTrackIndex'));
      if(!isNaN(lastPlayedTrackIndex) && lastPlayedTrackIndex < playlist.length){
        setCurrentTrackIndex(lastPlayedTrackIndex);
      }
  }, []);

  const handleFileChange =(e)=>{
    const files = Array.from(e.target.files);
    setPlaylist([...playlist, ...files]);
  };
  const handlePlay =(index)=>{
    setCurrentTrackIndex(index);
    localStorage.setItem('lastPlayedTrackIndex', index);
  };

  const handleEnded = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    localStorage.setItem('lastPlayedTrackIndex', (currentTrackIndex + 1) % playlist.length);
  };
  return (
    <div className='app'>
      <div className='header'> <h1>The ioT- Ready Music player</h1> </div>
      <div className='component'>
        <div className='player'>
        {playlist.length > 0 && (
          <audio 
           controls autoPlay
           src={URL.createObjectURL(playlist[currentTrackIndex])}
           onEnded={handleEnded}
          />
        )}
        </div>
        <div className='playlist'>
          <ol>
            {playlist.map((file, index)=>(

            <li key={index}>
              <AiFillPlayCircle />
              <button className='playButton' onClick={()=>handlePlay(index)} >Play this song</button>
              <br /> {file.name}
            </li>
            ))}
          </ol>
        </div>
        
        <div className='uploadSong'>
          <input type='file' accept='audio/*' onChange={handleFileChange} multiple />
        </div> 
      </div>
      
    </div>
  )
}

export default App



