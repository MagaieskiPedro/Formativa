import estilo from './Menu.module.css'
export function Disciplinas(){
    return(
        <main className={estilo.container}>
            <table>
                    <tr>
                        <th>
                            Nome
                        </th>
                        <th>
                            Curso
                        </th>
                        <th>
                            Carga Horaria
                        </th>
                        <th>
                            Descrição
                        </th>
                        <th>
                            Professor
                        </th>
                        <th>
                            Ambiente
                        </th>
                    </tr>
            </table>
        </main>
    )
}