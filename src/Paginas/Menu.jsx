import estilo from './Menu.module.css'
export function Menu(){
    return(
        <main className={estilo.container}>
            <table>
                    <tr>
                        <td>
                            Professores
                        </td>
                        <td>
                            Gestores
                        </td>
                        <td>
                            Discilplina
                        </td>
                        <td>
                            Ambiente
                        </td>
                    </tr>
            </table>
        </main>
    )
}