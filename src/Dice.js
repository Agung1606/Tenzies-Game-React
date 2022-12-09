import React from 'react';
import './style.css';

export default function Dice(props) {
  const styles = {
    backgroundColor: props.isHeld ? "#0FDDAF" : "white"
  }

  return(
    <div className="dice-face" style={styles} onClick={props.handleHeld}>
      <h2>{props.value}</h2>
    </div>
  );
}