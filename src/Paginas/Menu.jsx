import estilo from './Menu.module.css'
export function Menu(){
    return(
        <main className={estilo.container}>
            <table>
                    <tr>
                        <td>
                            Gestores
                        </td>
                        <td>
                            Professores
                        </td>
                        <td>
                            Disciplinas
                        </td>
                        <td>
                            Ambientes Reservados
                        </td>
                    </tr>
            </table>
        </main>
    )
}