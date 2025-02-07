import '../../assets/CSS/Register.css'; // Importa el archivo CSS
import {Link} from 'react-router-dom';

export function Register() {

    return (
        <>
            <section id='Register'>
                <div className="container">
                    <h1>Registro</h1>
                    <form className='d-flex flex-column justify-content-center align-items-center gap-3'>
                        <div className='d-flex flex-row gap-3'>
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Correo electrónico"
                            />
                        </div>
                        <div  className='d-flex flex-row gap-3'>
                            <label htmlFor="pass">Contraseña</label>
                            <input
                                name="pass"
                                type="password"
                                placeholder="Contraseña"
                            />
                        </div>
                        <div className='d-flex flex-row gap-3'>
                            <label htmlFor="pass">Comprobar contraseña</label>
                            <input
                                name="pass"
                                type="password"
                                placeholder="Comprobar contraseña"
                            />
                        </div>
                        <div className="container-buttons">
                            <button type="submit">Registrarse</button>
                        </div>
                    </form>
                    <Link to="/Pokedex" className='Link'>Volver al inicio</Link>
                    <Link to="/Login" className='Link'>¿Ya estas registrado? Logueate</Link>
                </div>
            </section>
        </>
    );
}