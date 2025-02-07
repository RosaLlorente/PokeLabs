import "../../assets/CSS/Pokedex.css";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";  // Importar Modal y Button de react-bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

export function Pokedex() {
    const [ListaPokemons, setListaPokemons] = useState([]);
    const [urlLPokeApi, setURLPokeApi] = useState("https://pokeapi.co/api/v2/pokemon?limit=12");
    const [pokemonImages, setPokemonImages] = useState([]);
    const [pokemonSeleccionado, setPokemonSeleccionado] = useState(null);

    useEffect(() => {
        cargarTodos();
    }, []);

    function cargarTodos() {
        fetch(urlLPokeApi)
            .then((response) => response.json())
            .then((datos) => {
                setListaPokemons(ListaPokemons.concat(datos.results));
                setURLPokeApi(datos.next); 
                datos.results.forEach(pokemon => {
                    cargarPokemonData(pokemon.url);
                });
            });
    }

    function cargarPokemonData(pokemonUrl) {
        fetch(pokemonUrl)
            .then((response) => response.json())
            .then((datos) => {
                const pokemonData = {
                    name: datos.name,
                    front_default: datos.sprites.front_default,
                    back_default: datos.sprites.back_default,
                    front_shiny: datos.sprites.front_shiny,
                    back_shiny: datos.sprites.back_shiny,
                    other_front_default: datos.sprites.other?.dream_world?.front_default || "/Img/Nofound.png",
                    other_home_front_default: datos.sprites.other?.home?.front_default || "/Img/Nofound.png",
                    other_home_front_shiny: datos.sprites.other?.home?.front_shiny || "/Img/Nofound.png",
                    other_officialartwork_front_default: datos.sprites.other?.["official-artwork"]?.front_default || "/Img/Nofound.png",
                    other_officialartwork_front_shiny: datos.sprites.other?.["official-artwork"]?.front_shiny || "/Img/Nofound.png",
                    other_showdown_front_default: datos.sprites.other?.showdown?.front_default || "/Img/Nofound.png",
                    other_showdown_back_default: datos.sprites.other?.showdown?.back_default || "/Img/Nofound.png",
                    other_showdown_front_shiny: datos.sprites.other?.showdown?.front_shiny || "/Img/Nofound.png",
                    other_showdown_back_shiny: datos.sprites.other?.showdown?.back_shiny || "/Img/Nofound.png",
                    front_default: datos.sprites.front_default,
                    ability1: datos.abilities[0].ability.name || "Dato no encontado",
                    especie: datos.species.name || "Dato no encontado",
                    move1: datos.moves[0].move.name || "Dato no encontado",
                    move2: datos.moves[1].move.name || "Dato no encontado",
                    move3: datos.moves[2].move.name || "Dato no encontado",
                    move4: datos.moves[3].move.name || "Dato no encontado",
                    move5: datos.moves[4].move.name || "Dato no encontado",
                    cries: `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${datos.id}.ogg`
                };
                setPokemonImages(prevImages => [...prevImages, pokemonData]);
            });
    }
    function PlayCry(Cry) {
        const audio = new Audio(Cry);
        audio.play();
        audio.volume = 0.05;
    }

    function seleccionarPokemon(pokemon) {
        setPokemonSeleccionado(pokemon);
    }

    function cerrarModal() {
        setPokemonSeleccionado(null);
    }

    return (
        <>
            <section id="Pokedex">
                <div className="Pokedex">
                    <ul>
                        {ListaPokemons.map((pokemon, index) => {
                            const pokemonDetails = pokemonImages.find(p => p.name === pokemon.name);
                            return (
                                <li key={index} onClick={() => seleccionarPokemon(pokemonDetails)}>
                                    {pokemonDetails && (
                                        <div>
                                            <img src={pokemonDetails.other_showdown_front_default} alt={pokemon.name} />
                                        </div>
                                    )}
                                    <button onClick={() => PlayCry(pokemonDetails?.cries)}>
                                        <p>{pokemon.name}</p>
                                    </button>
                                </li>
                            );
                        })}
                    </ul>

                    <button onClick={cargarTodos}>Cargar más</button>
                </div>
            </section>

            {/* Modal de Bootstrap */}
            <Modal show={pokemonSeleccionado !== null} onHide={cerrarModal}>
                <Modal.Header closeButton>
                    <Modal.Title>{pokemonSeleccionado?.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <section>
                        <div id="carouselExample" class="carousel slide">
                            <div class="carousel-inner">
                                <div class="carousel-item active">
                                    <img src={pokemonSeleccionado?.front_shiny} alt={pokemonSeleccionado?.name} />      
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.front_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.back_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.back_shiny} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_front_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_home_front_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_home_front_shiny} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_officialartwork_front_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_officialartwork_front_shiny} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_showdown_front_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_showdown_back_default} alt={pokemonSeleccionado?.name} />
                                </div>

                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_showdown_front_shiny} alt={pokemonSeleccionado?.name} />
                                </div>
                                
                                <div class="carousel-item">
                                    <img src={pokemonSeleccionado?.other_showdown_back_shiny} alt={pokemonSeleccionado?.name} />
                                </div>
                            </div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                            </button>
                        </div>
                    </section>
                    <section className="Informacion">
                        <h2>Información del Pokémon</h2>
                        <p>Especie: {pokemonSeleccionado?.especie}</p>
                        <p>Move 1: {pokemonSeleccionado?.move1}</p>
                        <p>Move 2: {pokemonSeleccionado?.move2}</p>
                        <p>Move 3: {pokemonSeleccionado?.move3}</p>
                        <p>Move 4: {pokemonSeleccionado?.move4}</p>
                        <p>Move 5: {pokemonSeleccionado?.move5}</p>
                        <p>Ability 1: {pokemonSeleccionado?.ability1}</p>
                        <p>Ability 2: {pokemonSeleccionado?.ability2}</p>
                    </section>
                    <button onClick={() => PlayCry(pokemonSeleccionado?.cries)}>
                        Reproducir Grito
                    </button>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={cerrarModal}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
