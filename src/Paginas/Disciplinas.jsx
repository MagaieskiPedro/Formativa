import estilo from './Disciplinas.module.css'
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom'

import Modal from 'react-modal'
import axios from 'axios';


import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// URL base da api
const API_URL = 'http://127.0.0.1:8000'

// Validação zod
const schemaProfessor = z.object({
    nome: z.string()
        .min(1,'Informe o nome da disciplina')
        .max(15, 'Informe um nome de disciplina de até 15 caracteres'),
    curso: z.string()
        .min(1,'Informe seu curso')
        .max(15, 'Informe um curso de até 15 caracteres'),
    carga_horaria: z.number()
        .gte(1,'Informe sua carga horaria')
        .lte(999999999999999, 'Informe uma carga horaria de até 15 caracteres'),
    descrição: z.string()
        .min(1,'Informe a descrição da sua disciplina')
        .max(30,'Informe a descrição da sua disciplina de até 30 caracteres'),
    professor: z.number()
        .gte(1,'Informe o numero do professor dessa disciplina')
        .lte(999999999999999, 'Informe um numero do professor de até 15 caracteres'),
    ambiente: z.number()
        .gte(1,'Informe o numero do ambiente dessa disciplina')
        .lte(999999999999999, 'Informe um numero de ambiente de até 15 caracteres'),
})

export function Disciplinas(){
    // Hooks de dados e do modal
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
            resolver: zodResolver(schemaProfessor)
    })
    
    // Constantes de navegação e de token de acesso
    const navigate = useNavigate();
    const access_token = localStorage.getItem('access_token')

    //Metodos para GET POST e DELETE
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/disciplina`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            setData(response.data)
        }catch (error) {
            console.log('error: ', error)
        }
    };

    const obterDadosFormulario = async (data) =>{
        console.log(`Dados: ${data}`)
        try{
            const response = await axios.post(`${API_URL}/api/disciplina`, {
                'nome': data.nome,
                'curso':data.curso,
                'carga_horaria':data.carga_horaria,
                'descrição':data.descrição,
                'professor':data.professor,
                'ambiente':data.ambiente
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });
            // const { disciplina } = response.data;
            closeModal();
            obterDados();
        }catch(error){
            console.error('erro no cadastro', data);
            alert('erro ao cadastrar')
        }
    }

    const deletarDado = async (IDNTY) => {
        try{
           const response = await axios.delete(`${API_URL}/api/disciplina/${IDNTY}`, {
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
                <tbody className={estilo.centro}>
                {data.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.nome}</td>
                        <td>{item.curso}</td>
                        <td>{item.carga_horaria}</td>
                        <td>{item.descrição}</td>
                        <td>{item.professor}</td>
                        <td>{item.ambiente}</td>
                        <td><button className={estilo.editar} onClick={openModal}>Editar</button></td>
                        <td><button className={estilo.deletar} onClick={() =>deletarDado(item.id)}>Deletar</button></td>
                    </tr>
                ))}
                </tbody>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={estilo.modal}
                    contentLabel="Modal registro disciplina"
                    ariaHideApp={false}
                >
                    <button onClick={closeModal} className={estilo.deletar} >x</button>
                    <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilo.formFlex}>
                        <h2 className={estilo.titulo}>Cadastre uma disciplina</h2>
                        <label className={estilo.label}>Nome da disciplina</label>
                        <input className={estilo.input} {...register('nome')} type="text" name='nome' placeholder='Nome'/>
                        {errors.nome && <p className={estilo.erro}>{errors.nome.message}</p>}
                        <div className={estilo.formGrid}>
                            <label className={estilo.label}>Curso da disciplina
                                <input className={estilo.input} type="text" name='curso' placeholder='Curso'
                                {...register('curso')}/>
                                {errors.curso && <p className={estilo.erro}>{errors.curso.message}</p>}
                            </label>

                            <label className={estilo.label}> Carga Horaria da disciplina
                                <input className={estilo.input} type="number" name='carga_horaria' placeholder='Carga Horaria'
                                {...register('carga_horaria', {
                                    setValueAs: (carga_horaria) => Number(carga_horaria),
                                  })}/>
                                {errors.carga_horaria && <p className={estilo.erro}>{errors.carga_horaria.message}</p>}
                            </label>

                            <label className={estilo.label}>Descrição da disciplina
                                <input className={estilo.input} type="text" name='descrição' placeholder='Descrição' 
                                {...register('descrição')}/>
                                {errors.descrição && <p className={estilo.erro}>{errors.descrição.message}</p>}
                            </label>
                            <label >Numero do Professor
                                <input className={estilo.input} type="number" name='professor' placeholder='Numero Professor'
                                {...register('professor', {
                                    setValueAs: (professor) => Number(professor),
                                  })}/>
                                {errors.professor && <p className={estilo.erro}>{errors.professor.message}</p>}
                            </label>
                            <label >Numero de ambiente reservado
                                <input className={estilo.input} type="number" name='ambiente' placeholder='Numero Ambiente'
                                    {...register('ambiente', {
                                        setValueAs: (ambiente) => Number(ambiente),
                                      })} />
                                    {errors.ambiente && <p className={estilo.erro}>{errors.ambiente.message}</p>}
                            </label>

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