import estilo from './Login.module.css'
export function Login(){
    return(
        <main className={estilo.container}>
            <form method='post' className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Entrar</h2>
                <input className={estilo.input} type="text" id='username' placeholder='Nome de usuario'/>
                <input className={estilo.input} type="password" placeholder='Senha'/>
                <input className={estilo.submit} type="submit" value="Submit"/>
            </form>
        </main>
    )
}