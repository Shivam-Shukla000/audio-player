import { useEffect, useState } from "react";

import "./App.css";
import Header from "./views/Header";
import Playlist from "./views/Playlist";
import Player from "./views/Player";

function App() {
  const [files, setFiles] = useState([]);
  const [currentAudio, setCurrentAudio] = useState(0);
  useEffect(() => {
    const index = localStorage.getItem("playingIndex");
    if (index) {
      setCurrentAudio(index);
    }
  }, []);

  return (
    <>
      <Header files={files} setFiles={setFiles} />
      <Playlist
        setCurrentAudio={setCurrentAudio}
        files={files}
        setFiles={setFiles}
      />
      <Player currentAudio={currentAudio} files={files} />
    </>
  );
}

export default App;
