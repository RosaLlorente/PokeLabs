import "../../assets/CSS/Landing.css"
import { useNavigate } from 'react-router-dom';

export function LandingPage() {
  const navigate = useNavigate();
  
  return (
    <>
      <main id="Landing">
        <div
          className="Contenido position-absolute top-50 start-50 translate-middle text-center text-white"
          tabIndex="0"
        >
          <button  onClick={() => navigate("/Pokedex")}>Comenzar</button>
        </div>

        <video
          className="video-bg position-absolute top-0 start-0 w-100 h-100"
          muted
          autoPlay
          loop
        >
          <source src="/video/VideoLanding.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </main>
    </>
  )
}