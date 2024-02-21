import "./Header.css";
export default function Header(props) {
  const handleClick = () => {
    const input = document.getElementById("input");
    input.click();
  };

  const handleFileRead = (file, result) => {
    const request = window.indexedDB.open("IndexedDb", 1);
    request.onsuccess = (e) => {
      const db = e.target.result;
      const tx = db.transaction("audioDb", "readwrite");
      tx.onerror = (e) => console.log(e.target.error);
      const objectStore = tx.objectStore("audioDb");
      const addRequest = objectStore.add({
        name: file,
        url: result,
      });
      addRequest.onsuccess = () => {
        props.setFiles([
          ...props.files,
          {
            name: file,
            url: result,
          },
        ]);
      };
    };
  };

  const addAudio = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      console.log(file.name);
      console.log(event.target.result);
      handleFileRead(file.name, event.target.result);
    };
    fileReader.readAsDataURL(file);
  };
  return (
    <>
      <div id="headContainer">
        <div>IoTReady</div>
        <button onClick={handleClick}>Add</button>
        <input onChange={addAudio} id="input" type="file" accept="audio/*" />
      </div>
      <hr />
    </>
  );
}
