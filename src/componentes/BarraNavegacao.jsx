import estilo from './BarraNavegacao.module.css';
import { Link } from "react-router-dom"

export function BarraNavegacao(){
    return (
        <nav className={estilo.container}>
            <ul>
            <Link to="/home">
                <li>Home</li>
            </Link>
            <Link to="/ambientes">
                <li>Ambientes</li>
            </Link>
            <Link to="/disciplinas">
                <li>Disciplinas</li>
            </Link>
            <Link to="/professores">
                <li>Professores</li>
            </Link>
            <Link to="/Login">
                <li>Login</li>
            </Link>
            <Link to="/Cadastro">
                <li>Cadastro</li>
            </Link>
            </ul>
        </nav>
    )
}