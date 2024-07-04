import { useState, useRef } from 'react';

// Adding Components
import Song from './components/Song';
import Player from './components/Player';
import Library from './components/library';
import Nav from './components/Nav';


// Adding styles
import "./styles/app.scss";

// Adding data
import data from './data'

function App() {

  // Refs
  const audioRef = useRef(null);

  // state
  const [songs, setSongs] = useState(data())
  const [currentSong, setCurrentSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [libraryStatus, setLibraryStatus] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currentTime: 0,
    duration: 0,
    animationPercentage: 0,
})

const timeUpdateHandler = (e) => {
  const current = e.target.currentTime;
  const duration = e.target.duration;

  const roundedCurrent = Math.round(current);
  const roundedDuration = Math.round(duration);
  const animation = Math.round((roundedCurrent / roundedDuration) * 100)

  setSongInfo({...songInfo, currentTime: current, duration, animationPercentage: animation,})
}

const activeLibraryHandler = (nextPrev) => {
  const newSongs = songs.map(song => {
      if(song.id === nextPrev.id) {
          return{
              ...song,
              active: true,
          }
      } else {
          return{
              ...song,
              active: false,
          }
      }
      
  })
  setSongs(newSongs)
}

const songEndHandler = async () => {
  let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
  await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);


  if (isPlaying) {
    setTimeout(() => {
      audioRef.current.play();
    }, 100);
  }
};

  return (
    <div className={`App ${libraryStatus ? 'library-active' : ''}`}>
      <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus}/>

      <Song currentSong={currentSong}/>

      <Player
      activeLibraryHandler={activeLibraryHandler}
      setSongs={setSongs}
      setIsPlaying={setIsPlaying} currentSong={currentSong} 
      isPlaying={isPlaying} audioRef={audioRef}
      songInfo={songInfo} setSongInfo={setSongInfo}
      songs={songs} setCurrentSong={setCurrentSong}/>

      <Library 
      libraryStatus={libraryStatus}
      setSongs={setSongs}
      isPlaying={isPlaying}
      setCurrentSong={setCurrentSong} songs={songs}
      audioRef={audioRef}/>

      <audio 
      onEnded={songEndHandler}
      onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} 
            ref={audioRef} src={currentSong.audio}></audio>
    </div>
  );
}

export default App;
