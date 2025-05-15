import estilo from './Cadastro.module.css'
export function Cadastro(){
    return(
        <main className={estilo.container}>
                <form method='post' className={estilo.formFlex}>
                    <h2 className={estilo.titulo}>Entrar</h2>
                    <input className={estilo.input} type="text" name='nome' placeholder='Nome de usuario'/>
                    <div className={estilo.formGrid}>
                        <input className={estilo.input} type="text" name='ni' placeholder='Numero de identificação'/>
                        <input className={estilo.input} type="text" name='telefone' placeholder='Telefone'/>
                        <label for='Data Nascimento'>Data Nascimento
                            <input className={estilo.input} type="date" name='Data Nascimento' placeholder='Data de nascimento'/>
                        </label>
                        <label for='Data de contratação'>Data de contratação
                            <input className={estilo.input} type="date" name='Data de contratação' placeholder='Data de contratação'/>
                        </label>
                        
                        <input className={estilo.input} type="password" name="password" placeholder='Senha'/>
                        <input className={estilo.input} type="password" name="password2" placeholder='Confirme sua Senha'/>
                        <label for="C" className={estilo.put}>Usuario comum
                            <input type="radio" name="categoria" value="C"/>
                        </label>
                        <label for="G" >Usuario gestor
                            <input type="radio" name="categoria" value="G"/>
                        </label>
                    </div>
                    <input className={estilo.submit} type="submit" value="Submit"/>
                </form>
        </main>
    )
}