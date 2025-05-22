
import estilo from './Home.module.css';



export function Home(){

    return(
        <main className={estilo.container}>
            <form className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Não há Nada Para Ver Aqui</h2>
            </form>
        </main>
    )
}