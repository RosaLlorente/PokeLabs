import '../../assets/CSS/TresRayas.css';
import React, { useState, useEffect, useRef } from "react";

export function TresEnRayas() {
    const [tablero, setTablero] = useState(Array(9).fill(null)); // 9 celdas vacías
    const [esTurnoPikachu, setEsTurnoPikachu] = useState(true); // Empieza Pikachu
    const [imagenes, setImagenes] = useState({ pikachu: "", charmander: "" }); // Guardamos las imágenes
    const [ganador, setGanador] = useState(null); // Almacena al ganador

    // Crear una referencia para cada celda del tablero
    const celdasRef = useRef([]);

    // Obtener las imágenes y los sonidos de Pikachu y Charmander
    useEffect(() => {
        fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
            .then((res) => res.json())
            .then((data) => {
                setImagenes((prev) => ({
                    ...prev,
                    pikachu: data.sprites.front_default,
                    pikachuCry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`
                }));
            });

        fetch("https://pokeapi.co/api/v2/pokemon/charmander")
            .then((res) => res.json())
            .then((data) => {
                setImagenes((prev) => ({
                    ...prev,
                    charmander: data.sprites.front_default,
                    charmanderCry: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${data.id}.ogg`
                }));
            });
    }, []);

    // Combinaciones ganadoras
    function comprobarGanador(tableroNuevo) 
    {
        const lineasGanadoras = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        for (let [a, b, c] of lineasGanadoras) 
        {
            if (tableroNuevo[a] && tableroNuevo[a] === tableroNuevo[b] && tableroNuevo[a] === tableroNuevo[c]) {
                return tableroNuevo[a];
            }
        }
        return null;
    }

    function manejarClick(index) 
    {
        if (tablero[index] || ganador) return; // Si ya está ocupado o ya hay un ganador, no hacer nada

        const nuevoTablero = [...tablero];
        nuevoTablero[index] = esTurnoPikachu ? "pikachu" : "charmander"; // Marca la celda con el jugador actual
        setTablero(nuevoTablero);
        setEsTurnoPikachu(!esTurnoPikachu); // Cambia el turno

        // Cambiar el color de fondo de la celda seleccionada
        if (esTurnoPikachu) 
        {
            celdasRef.current[index].style.backgroundColor = "yellow";
        } else 
        {
            celdasRef.current[index].style.backgroundColor = "red";
        }

        const ganadorDelJuego = comprobarGanador(nuevoTablero);
        if (ganadorDelJuego) 
        {
            setGanador(ganadorDelJuego); // Si hay un ganador, lo guarda
            reproducirGrito(imagenes[`${ganadorDelJuego}Cry`]); // Reproduce el grito del ganador
        }
    }

    // Reinicia el juego
    function reiniciarJuego() 
    {
        setTablero(Array(9).fill(null));
        setEsTurnoPikachu(true);
        setGanador(null);
        // Reiniciar el color de fondo de las celdas
        celdasRef.current.forEach(celda => 
        {
            celda.style.backgroundColor = "#f8f9fa"; 
        });
    }

    function reproducirGrito(sonido) 
    {
        const audio = new Audio(sonido);
        audio.play();
        audio.volume = 0.05; 
    }

    return (
        <section id='TresRayas'>
            <div className="container text-center mt-4">
                <h1>Tres en Raya Pokémon</h1>
                <div className="row justify-content-center">
                    <div className="col-6">
                        <div className="grid">
                            {tablero.map((celda, index) => (
                                <div
                                    key={index}
                                    ref={(el) => celdasRef.current[index] = el} // Asignar la referencia a cada celda
                                    className="border border-dark p-3 d-flex align-items-center justify-content-center"
                                    onClick={() => manejarClick(index)}
                                >
                                    {celda && <img src={imagenes[celda]} alt={celda} width={80} />}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {!ganador && esTurnoPikachu ? (
                    <h2 className="mt-3">Pikachu ⚡ está en turno</h2>
                ) : !ganador ? (
                    <h2 className="mt-3">Charmander 🔥 está en turno</h2>
                ) : (
                    <h2 className="mt-3">
                        ¡{ganador === "pikachu" ? "Pikachu ⚡" : "Charmander 🔥"} ha ganado!
                    </h2>
                )}
                <button className="btn btn-primary mt-3" onClick={reiniciarJuego}>
                    Reiniciar Juego
                </button>
            </div>
        </section>
    );
}
