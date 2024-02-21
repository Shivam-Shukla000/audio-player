import "./Player.css";
export default function Player(props) {
  return (
    <>
      <audio controls src={props.files[props.currentAudio]?.url}></audio>
    </>
  );
}
