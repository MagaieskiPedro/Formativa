
import estilo from './Home.module.css';

const logoff = async () => {
    localStorage.setItem('access_token',null)
}

export function Home(){

    return(
        <main className={estilo.container}>
            <form className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Não há Nada Para Ver Aqui</h2>
                <button className={estilo.submit} onClick={() => logoff()}>Logoff</button>
            </form>
        </main>
    )
}