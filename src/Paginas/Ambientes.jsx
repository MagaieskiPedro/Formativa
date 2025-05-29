import { useState } from 'react'
import estilo from './Ambientes.module.css'
import { useEffect } from 'react'
import axios from "axios"

const API_URL = 'http://127.0.0.1:8000'

export function Ambientes(){

    const [data, setData] = useState([]);
    const access_token = localStorage.getItem('access_token')
    // console.log(access_token)
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/reservaAmbiente`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            // console.log("Dados: ", response.data[1].id)
            setData(response.data)
        }catch (error) {
            console.log('error: ', error)
        }
    };

    const deletarDado = async (IDNTY) => {
        try{
           const response = await axios.delete(`${API_URL}/api/reservaAmbiente/${IDNTY}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            obterDados()
        }catch (error) {
            console.log('error: ', error)
        }
    }

    useEffect(() => {
        obterDados();
      }, []);

    return(
        <main className={estilo.container}>
            {/* <button className={estilo.criar} onClick={openModal}>Criar novo</button> */}
            {data.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>
                            Data Inicio
                        </th>
                        <th>
                           Data Termino
                        </th>
                        <th>
                            Periodo
                        </th>
                        <th>
                            Sala
                        </th>
                        <th>
                            Professor
                        </th>
                    </tr>
                </thead>
                <tbody className={estilo.centro}>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.data_inicio}</td>
                        <td>{item.data_termino}</td>
                        <td>{item.periodo}</td>
                        <td>{item.sala}</td>
                        <td>{item.professor}</td>
                        <td><button className={estilo.editar} onClick={() => editarDado(item.id)}>Editar</button></td>
                        <td><button className={estilo.deletar} onClick={() =>deletarDado(item.id)}>Deletar</button></td>
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