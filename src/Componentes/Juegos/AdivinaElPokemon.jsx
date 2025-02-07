import "../../assets/CSS/AdivinaPokemon.css";

import React, { useState, useEffect } from "react";

export function AdivinaElPokemon() {
    const [pokemon, setPokemon] = useState(null);
    const [input, setInput] = useState("");
    const [reveal, setReveal] = useState(false);
    const [fallo, setFallo] = useState(false);

    useEffect(() => {
        obtenerPokemon();
    }, []);

    function obtenerPokemon() 
    {
        let id = Math.floor(Math.random() * 950) + 1; // Pokémon del 1 al 950(máx en la pokeapi) Nota:No salen algunas imagenes por que no estan registradas
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(res => res.json())
            .then(data => {
                setPokemon({
                    name: data.name,
                    image: data.sprites.front_default,
                    shadow: data.sprites.other["official-artwork"].front_default
                });
                setReveal(false);
                setInput("");
                setFallo(false);
            });
    }

    function comprobarRespuesta() 
    {
        if (input.toLowerCase().trim() === pokemon.name) 
        {
            setReveal(true);
            setFallo(false);
        } else 
        {
            setFallo(true);
        }
    }

    return (
        <section id="AdivinaPokemon">
            <div className="container">
                <h2>¿Quién es este Pokémon?</h2>
                {pokemon && (
                    <img 
                        src={reveal ? pokemon.image : pokemon.shadow} 
                        alt="Pokemon" 
                        className={`pokemon-img ${reveal ? "reveal" : ""}`}
                    />
                )}
                <div>
                    <input 
                        type="text" 
                        value={input} 
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Escribe el nombre"
                        className="input-text"
                        onKeyDown={(e) => e.key === "Enter" && comprobarRespuesta()}
                    />
                    <button onClick={comprobarRespuesta} className="btn">Adivinar</button>
                </div>
                {fallo && <p className="error">¡Incorrecto! Inténtalo de nuevo.</p>}
                {reveal && <button onClick={obtenerPokemon} className="btn">Nuevo Pokémon</button>}
            </div>
        </section>
    );
}

