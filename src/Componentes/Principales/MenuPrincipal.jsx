import "../../assets/CSS/main.css";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Pokedex } from "../Pokedex/Pokedex";

export function MenuPrincipal() {
    const [audioEnCurso, setAudioEnCurso] = useState(false);
    const [keySound, setKeySound] = useState(null);

    function PlaySoundTrack() {
        const newKeySound = new Audio('/Audios/MusicaFondo.mp3');
        newKeySound.play();
        newKeySound.loop = true;
        newKeySound.volume = 0.02;
        setKeySound(newKeySound);
        setAudioEnCurso(true);
    }

    function SoundTrackDissable() {
        if (keySound) {
        keySound.pause();
        keySound.currentTime = 0;
        }
        setAudioEnCurso(false);
    }

    function SoundTrack() {
        if (audioEnCurso) {
        SoundTrackDissable();
        } else {
        PlaySoundTrack();
        }
    }

    return (
        <>
        <nav className="MENU">
            <div className="menu-top">
                <div className="linea1">
                    <div className="circle">
                    <div className="circle2">
                        <div className="circle3"></div>
                    </div>
                    </div>
                    <div className="indicators">
                    <div className="led led-red"></div>
                    <div className="led led-yellow"></div>
                    <div className="led led-green"></div>
                    </div>
                    <nav>
                    <ol>
                        <li><Link to="/Pokedex" className="Link">Volver al inicio</Link></li>
                        <li><Link to="/TresEnRayas" className="Link">Tres en Rayas</Link></li>
                        <li><Link to="/AdivinaElPokemon" className="Link">Adivina el Pokemon</Link></li>
                        <li onClick={SoundTrack} className="Musica">Musica: {audioEnCurso ? <b className="active">On</b> : <b className="disabled">Off</b>}</li>
                    </ol>
                    <ol>
                        <li><Link to="/Login" className="Link">Iniciar sesión</Link></li>
                        <li><Link to="/Register" className="Link">Register</Link></li>
                    </ol>
                    </nav>
                </div>
            </div>
        </nav>
        </>
    );
}
