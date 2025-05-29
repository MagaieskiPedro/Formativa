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
    carga_horaria: z.string()
        .min(15,'Informe sua carga horaria'),
    descrição: z.string()
        .min(8,'Informe a descrição da sua disciplina'),
    professor: z.string()
        .min(1,'Informe o numero do professor dessa disciplina'),
        ambiente: z.string()
        .min(1,'Informe o numero do ambiente dessa disciplina')
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
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/disciplina`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            // console.log("Dados: ", response.data)
            setData(response.data)
        }catch (error) {
            console.log('error: ', error)
        }
    };

    const obterDadosFormulario = async (data) =>{
        console.log(`Dados: ${data}`)
        try{
            const response = await axios.post(`${API_URL}/api/disciplinas`, {
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
            const { disciplina } = response.data;
            console.log("id disciplina: "+ disciplina.id)
            navigate('/')
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
                    contentLabel="Example Modal"
                    ariaHideApp={false}
                >
                    <button onClick={closeModal} className={estilo.deletar} >x</button>
                    <form onSubmit={handleSubmit(obterDadosFormulario)} className={estilo.formFlex}>
                        <h2 className={estilo.titulo}>Cadastre-se</h2>
                        <label className={estilo.label}>Nome</label>
                        <input className={estilo.input} {...register('username')} type="text" name='username' placeholder='Nome de usuario'/>
                        {errors.username && <p className={estilo.erro}>{errors.username.message}</p>}
                        <div className={estilo.formGrid}>
                            <label className={estilo.label}>Numero de Identificação
                                <input className={estilo.input} type="text" name='ni' placeholder='Numero de identificação'
                                {...register('ni')}/>
                                {errors.ni && <p className={estilo.erro}>{errors.ni.message}</p>}
                            </label>

                            <label className={estilo.label}>Telefone 
                                <input className={estilo.input} type="text" name='telefone' placeholder='Telefone'
                                {...register('telefone')}/>
                                {errors.telefone && <p className={estilo.erro}>{errors.telefone.message}</p>}
                            </label>

                            <label className={estilo.label}>Data Nascimento
                                <input className={estilo.input} type="date" name='data_nascimento' placeholder='Data de nascimento' 
                                {...register('data_nascimento')}/>
                                {errors.data_nascimento && <p className={estilo.erro}>{errors.data_nascimento.message}</p>}
                            </label>
                            <label >Data de contratação
                                <input className={estilo.input} type="date" name='data_contratação' placeholder='Data de contratação'
                                {...register('data_contratação')}/>
                                {errors.data_contratação && <p className={estilo.erro}>{errors.data_contratação.message}</p>}
                            </label>
                            <label >Senha 
                                <input className={estilo.input} type="password" name='password' placeholder='Senha'
                                    {...register('password')} />
                                    {errors.password && <p className={estilo.erro}>{errors.password.message}</p>}
                            </label>
                            <label >Confirme sua senha
                                <input className={estilo.input} type="password" name='password2' placeholder='Confirme sua Senha'
                                    {...register('password2')}/>
                                    {errors.password2 && <p className={estilo.erro}>{errors.password2.message}</p>}
                            </label>

                            <select className={estilo.select} {...register('categoria')}>
                                <option value="C">Comum</option>
                                <option value="G">Gestor</option>
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