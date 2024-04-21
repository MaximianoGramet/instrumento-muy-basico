import React, { useEffect, useState } from 'react';
import Soundfont from 'soundfont-player';
import { Tecla } from './Tecla';
import instruments from "../assets/instruments.json"
import './Piano.css'


const audioContext = new AudioContext();
const instrumentos = instruments.instrumentos;

export const Piano = () => {
  const notas = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'];
  const [piano, setPiano] = useState(null);
  const [instrumentoSeleccionado, setInstrumentoSeleccionado] = useState('acoustic_grand_piano');

  useEffect(() => {
    cargarInstrumento(instrumentoSeleccionado);
  }, [instrumentoSeleccionado]);

  const cargarInstrumento = async (instrumento) => {
    if (piano) {
      audioContext.suspend();
      setPiano(null);
    }
    const loadedPiano = await Soundfont.instrument(audioContext, instrumento);
    setPiano(loadedPiano);
    audioContext.resume();
  };

  const playNote = (note) => {
    if (piano) {
      piano.play(note);
    }
  };

  const handleKeyDown = (event) => {
    const key = event.key.toUpperCase();
    const index = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'].indexOf(key);
    if (index !== -1) {
      playNote(notas[index]);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [notas]);

  const handleChangeInstrumento = (event) => {
    setInstrumentoSeleccionado(event.target.value);
  };

  const handleAplicarInstrumento = () => {
    cargarInstrumento(instrumentoSeleccionado);
  };

  return (
    <div className="piano-container">
      <div className="instrument-selector">
        <select value={instrumentoSeleccionado} onChange={handleChangeInstrumento}>
          {instrumentos.map((instrumento, index) => (
            <option key={index} value={instrumento}>
              {instrumento}
            </option>
          ))}
        </select>
        <button onClick={handleAplicarInstrumento}>Aplicar</button>
      </div>
      <div className="teclas-container">
        {['C', 'D', 'E', 'F', 'G', 'A', 'B'].map((nota, index) => (
          <Tecla key={index} note={`${nota}4`} playNote={playNote} />
        ))}
      </div>
    </div>
  );
};


//partes del volumen WIP
/*
const [volumen, setVolumen] = useState(0.5);
const handleChangeVolumen = (event) => {
    const newVolume = parseFloat(event.target.value);
    setVolumen(newVolume);
    if (piano) {
      piano.volume.value = newVolume;
    }
  };

  visual:
    <div className="volume-slider">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volumen}
          onChange={handleChangeVolumen}
        />
        <label>Volumen</label>
// nota: esto no está en uso ya que al aplicarlo las teclas dejan de funcionar
//entre otros problemas
*/