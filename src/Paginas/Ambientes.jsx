import estilo from './Ambientes.module.css'
import React, { useState } from 'react'
import { useEffect } from 'react'
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom'

import Modal from 'react-modal'
import axios from "axios"

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// URL base da api
const API_URL = 'http://127.0.0.1:8000'

// Validação zod
const schemaAmbiente = z.object({
    data_inicio: z.string()
        .min(1,'Informe a data_inicio')
        .max(15, 'Informe uma data_termino de até 15 caracteres'),
    data_termino: z.string()
        .min(1,'Informe sua data_termino')
        .max(15, 'Informe uma data_termino de até 15 caracteres'),
    periodo: z.string()
        .min(1,'Informe seu periodo')
        .max(1, 'Informe um periodo de até 1 caractere'),
    sala: z.string()
        .min(1,'Informe a sala')
        .max(15,'Informe a sala de até 30 caracteres'),
    professor: z.number()
        .gte(1,'Informe o numero do professor dessa disciplina')
        .lte(999999999999999, 'Informe um numero do professor de até 15 caracteres'),
})

export function Ambientes(){

    const [data, setData] = useState([]);
    const [modalIsOpen, setIsOpen] = React.useState(false);


    // abre modal
    function openModal() {
        setIsOpen(true);
    }
    
    // fecha modal
    function closeModal() {
        setIsOpen(false);
    }


    //  Registros do formulario passam por validação ao submit
    const{
            register,
            handleSubmit,
            formState: { errors }
    } = useForm({
            resolver: zodResolver(schemaAmbiente)
    })

    // Constantes de navegação e de token de acesso
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token')

    // Metodos para GET POST e DELETE
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

    
    const obterDadosFormulario = async (data) =>{
        console.log(`Dados: ${data}`)
        try{
            const response = await axios.post(`${API_URL}/api/reservaAmbiente`, {
                'data_inicio': data.data_inicio,
                'data_termino':data.data_termino,
                'periodo':data.periodo,
                'sala':data.sala,
                'professor':data.professor,
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });
            // const { ambiente } = response.data;
            closeModal();
            obterDados();
        }catch(error){
            console.error('erro no cadastro', data);
            alert('erro ao cadastrar')
        }
    }

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
            <button className={estilo.criar} onClick={openModal}>Criar novo</button>
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
                        <td>{item.id}</td>
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
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={estilo.modal}
                    contentLabel="Modal registro ambiente"
                    ariaHideApp={false}
                >
                    <button onClick={closeModal} className={estilo.deletar} >x</button>
                    <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilo.formFlex}>
                        <h2 className={estilo.titulo}>Cadastre um ambiente</h2>
                        <div className={estilo.formGrid}>
                            <label className={estilo.label}>Data de inicio de uso
                                <input className={estilo.input} 
                                {...register('data_inicio')} type="date" name='data_inicio' placeholder='data inicio'/>
                                {errors.data_inicio && <p className={estilo.erro}>{errors.data_inicio.message}</p>}
                            </label>
                            <label className={estilo.label}>Data de termino de uso
                                <input className={estilo.input} type="date" name='data_termino' placeholder='data termino'
                                {...register('data_termino')}/>
                                {errors.data_termino && <p className={estilo.erro}>{errors.data_termino.message}</p>}
                            </label>

                            <label className={estilo.label}>Sala de reservada
                                <input className={estilo.input} type="text" name='sala' placeholder='Sala'
                                {...register('sala')}/>
                                {errors.telefone && <p className={estilo.erro}>{errors.telefone.message}</p>}
                            </label>

                            <label >Numero do Professor
                                <input className={estilo.input} type="number" name='professor' placeholder='Numero Professor'
                                {...register('professor', {
                                    setValueAs: (professor) => Number(professor),
                                  })}/>
                                {errors.professor && <p className={estilo.erro}>{errors.professor.message}</p>}
                            </label>

                            <select className={estilo.select} {...register('periodo')}>
                                Periodo
                                <option value="M">Manhã</option>
                                <option value="T">Tarde</option>
                                <option value="N">Noite</option>
                            </select>
                        </div>
                        <input className={estilo.submit} type="submit" />
                    </form>
                </Modal>
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