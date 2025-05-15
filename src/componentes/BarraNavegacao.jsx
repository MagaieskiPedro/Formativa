import estilo from './BarraNavegacao.module.css';
import { Link } from "react-router-dom"

export function BarraNavegacao(){
    return (
        <nav className={estilo.container}>
            <ul>
            <Link to="/">
                <li>Escola</li>
            </Link>
            <Link to="/Login">
                <li>Login</li>
            </Link>
            <Link to="/Cadastro">
                <li>Cadastro</li>
            </Link>
                <li>Visão</li>
                <li>Valores</li>
            </ul>
        </nav>
    )
}