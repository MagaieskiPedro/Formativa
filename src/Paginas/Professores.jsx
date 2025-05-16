import estilo from './Menu.module.css'
export function Professores(){
    return(
        <main className={estilo.container}>
            <table>
                    <tr>
                        <th>
                            Professores
                        </th>
                        <th>
                            Gestores
                        </th>
                        <th>
                            Nº ID
                        </th>
                        <th>
                            Nome
                        </th>
                        <th>
                            Telefone
                        </th>
                        <th>
                            Data Nascimento
                        </th>
                        <th>
                            Data Contratação
                        </th>
                    </tr>
            </table>
        </main>
    )
}