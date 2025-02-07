import "../../assets/CSS/Error404.css"
import {Link} from 'react-router-dom';
export function Error404() {
    function PikachuHelp(){
        const KeySound = new Audio('/Audios/Pikachu.mp3');
        KeySound.play();
        KeySound.volume = 0.05;
        KeySound.playbackRate = 1.2; 
    };
    return (
    <section id="Error404" className="vh-100 position-relative">
    <div
        className="Contenido position-absolute top-50 start-50 translate-middle text-center text-white"
        tabIndex="0">

        <div className="MensajeError404">
            <h3>!Oops! Parece que te has perdido al buscar al pokemon 404</h3>
            <p>Tu compañero pikachu te ayudara a regrasar al inicio</p>
            <Link to="/Pokedex"><button onClick={PikachuHelp}>Dejar que pikachu te ayude</button></Link>
        </div>
    </div>

    <video
        className="video-bg position-absolute top-0 start-0 w-100 h-100"
        muted
        autoPlay
        loop
    >
        <source src="/video/Error404.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
    </video>
    </section>
    )
}
