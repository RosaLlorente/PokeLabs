import { Navigate,Outlet } from "react-router-dom";

export function RutasPrivadas() {
    let usuaruio = null;

    let auth= true; //Añadir logica de autenticación

    return (auth ? <Outlet />: <Navigate to="/Login" />);

}
