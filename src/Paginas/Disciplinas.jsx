import estilo from './Menu.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000'

export function Disciplinas(){
    const [data, setData] = useState([]);
    const access_token = localStorage.getItem('access_token')
    console.log(access_token)
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/disciplina`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            console.log("Dados: ", response.data)
            setData(response.data)
        }catch (error) {
            console.log('error: ', error)
        }
    };

    useEffect(() => {
        obterDados();
      }, []);

    return(
        <main className={estilo.container}>
            {data.length > 0 ? (
            <table>
                <thead>
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
                </thead>
                <tbody>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.nome}</td>
                        <td>{item.curso}</td>
                        <td>{item.carga_horaria}</td>
                        <td>{item.descrição}</td>
                        <td>{item.professor}</td>
                        <td>{item.ambiente}</td>
                    </tr>
                ))}
                </tbody>
            </table> ) : (
            <table>
                <tr>
                    <th>Sem Dados aqui</th>
                </tr>
            </table>
            )}
        </main>
    )
}