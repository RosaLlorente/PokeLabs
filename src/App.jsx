import { LandingPage } from './Componentes/Principales/LandingPage';
import { MenuPrincipal } from './Componentes/Principales/MenuPrincipal';
import { Pokedex } from './Componentes/Pokedex/Pokedex';
import { TresEnRayas } from './Componentes/Juegos/TresEnRayas';
import { AdivinaElPokemon } from './Componentes/Juegos/AdivinaElPokemon';
import { Login } from './Componentes/GestionSesion/Login';
import { Register } from './Componentes/GestionSesion/Register';
import { Error404 } from './Componentes/Errores/Error404';

import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { RutasPrivadas } from './Componentes/GestionRutas/RutasPrivadas';

function App() {
  return (
    <BrowserRouter>
      <RoutesWrapper />
    </BrowserRouter>
  );
}

function RoutesWrapper() {
  const location = useLocation(); //Hool useLocation para obtener la ruta actual

  return (
    <>
      {location.pathname !== '/' && <MenuPrincipal />}  {/* Si la ruta actual no es la de inicio, mostrar el MenuPrincipal */}

      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/Pokedex" element={<Pokedex />} />
          <Route element={<RutasPrivadas />}>
            <Route path="/TresEnRayas" element={<TresEnRayas />} />
            <Route path="/AdivinaElPokemon" element={<AdivinaElPokemon />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="*" element={<Error404 />} />
      </Routes>
    </>
  );
}

export default App;
