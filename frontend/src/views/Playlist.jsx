import { useEffect, useState } from "react";

export default function Playlist(props) {
  useEffect(() => {
    const dbOpenRequest = window.indexedDB.open("IndexedDb", 1);
    dbOpenRequest.onsuccess = (e) => {
      console.log("success");
      const db = e.target.result;
      const tx = db.transaction("audioDb", "readonly");
      const objectStore = tx.objectStore("audioDb");
      let x = [];
      objectStore.openCursor().onsuccess = (cursorEvent) => {
        const cursor = cursorEvent.target.result;

        if (cursor) {
          console.log(cursor.value);
          // props.setFiles([...props.files, cursor.value]);
          x.push(cursor.value);
          cursor.continue();
        }
        props.setFiles(x);
      };
    };
    dbOpenRequest.onupgradeneeded = (e) => {
      console.log("upgrade needed");
      const db = e.target.result;
      db.createObjectStore("audioDb", {
        keyPath: "name",
      });
      db.onerror = (e) => {
        console.log(e.target.error);
      };
    };
  }, []);
  const selectAudio = (index) => {
    props.setCurrentAudio(index);
  };
  const tracks = props.files.map((audio, index) => (
    <div className="tracks" key={index} onClick={() => selectAudio(index)}>
      {audio.name}
    </div>
  ));
  return <>{tracks}</>;
}
