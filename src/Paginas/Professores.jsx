import estilo from './Menu.module.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ta, tr } from 'zod/v4/locales';

const API_URL = 'http://127.0.0.1:8000'

export function Professores(){
    const [data, setData] = useState([]);
    const access_token = localStorage.getItem('access_token')
    console.log(access_token)
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/professores`, {
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
                            Professores
                        </th>
                        <th>
                            Categoria
                        </th>
                        <th>
                            Nº ID
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
                </thead>
                    <tbody>
                        {data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nome}</td>
                                <td>{item.categoria}</td>
                                <td>{item.ni}</td>
                                <td>{item.telefone}</td>
                                <td>{item.data_nascimento}</td>
                                <td>{item.data_contratação}</td>
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