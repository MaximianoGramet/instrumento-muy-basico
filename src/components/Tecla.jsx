import React from 'react';
import Soundfont from 'soundfont-player';


export const Tecla = ({ note }) => {
    const playNote = () => {
      Soundfont.instrument(new AudioContext(), 'acoustic_grand_piano').then((piano) => {
        piano.play(note);
      });
    };
  
    return (
      <button onClick={playNote}>
        {note}
      </button>
    );
  };
  