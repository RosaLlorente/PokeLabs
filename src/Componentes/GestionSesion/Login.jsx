import '../../assets/CSS/Login.css';
import {Link} from 'react-router-dom';

export function Login() {

    return (
        <>
            <section id='Login'>
                <div className="container">
                        <h1>Iniciar sesión</h1>
                        <form className='d-flex flex-column justify-content-center align-items-center gap-3'>
                            <div className='d-flex flex-row gap-3'>
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div className='d-flex flex-row gap-3'>
                                <label htmlFor="pass">Contraseña</label>
                                <input
                                    name="pass"
                                    type="password"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div className="container-buttons">
                                <button type="submit">Iniciar sesión</button>
                            </div>
                        </form>
                        <button>Iniciar sesión con Google</button>
                        <div className='d-flex flex-column justify-content-center align-items-center'>
                            <Link to="/Pokedex" className='Link'>Volver al inicio</Link><br />
                            <Link to="/Register" className='Link'>Si no tienes cuenta Registrate</Link>
                        </div>
                    </div>
            </section>
        </>
    );
}

