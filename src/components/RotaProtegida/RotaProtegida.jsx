import { Navigate } from "react-router-dom"; 

export const RotaProtegida = ({ children }) => {
    const usuarioAutenticado = localStorage.getItem('token')

    if(!usuarioAutenticado){
        return <Navigate to="/" replace />
    }

    return children
}