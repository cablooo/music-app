import React from "react";

import LibrarySong from "./librarySong";

const Library = ({ songs, setCurrentSong, audioRef, isPlaying, setSongs, libraryStatus }) => {
    return(
        <div className={`library ${libraryStatus ? 'active-library' : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => 
                <LibrarySong 
                song={song}
                setSongs={setSongs}
                setCurrentSong={setCurrentSong}
                songs={songs}
                id={song.id}
                key={song.id}
                isPlaying={isPlaying}
                audioRef={audioRef}/>)}
            </div>
        </div>
    )
}

export default Library