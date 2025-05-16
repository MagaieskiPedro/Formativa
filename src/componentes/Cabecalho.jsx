import estilo from './Cabecalho.module.css'
import { Link } from "react-router-dom"
export function Cabecalho(){
    return (
        <header className={estilo.container}>
            <Link to="/Login">
                <h1>Escolinha da ds15</h1>
            </Link>
        </header>
    )
}