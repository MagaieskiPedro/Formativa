import estilo from './Professores.module.css'
import React, { useEffect, useState } from 'react';
import {useForm} from 'react-hook-form';
import {useNavigate} from 'react-router-dom'
import Modal from 'react-modal'

import axios from 'axios';
import { Link } from 'react-router-dom';

import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


// Url base da api
const API_URL = 'http://127.0.0.1:8000'

// Validação zod
const schemaProfessor = z.object({
    username: z.string()
        .min(1,'Informe seu nome')
        .max(15, 'Informe um nome de até 15 caracteres'),
    ni: z.string()
        .min(1,'Informe seu numero de identificação')
        .max(15, 'Informe um numero de até 15 caracteres'),
    telefone: z.string()
        .min(1,'Informe seu telefone')
        .max(15, 'Informe um telefone de até 15 caracteres'),
    data_nascimento: z.string()
        .min(8,'Informe sua data de nascimento'),
    data_contratação: z.string()
        .min(8,'Informe sua data de nascimento'),
    password: z.string()
        .min(1,'Informe sua senha')
        .max(15, 'Informe uma senha de até 15 caracteres'),
    password2: z.string()
        .min(1,'Confirme sua senha')
        .max(15, 'Confirme uma senha de até 15 caracteres'),
    categoria: z.string()
        .min(1,"categoria faltando")
})
  

export function Professores(){
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


    // Metodos de Get, Post, Put e Delete
    const obterDados = async() => {
        try {
            const response = await axios.get(`${API_URL}/api/professores`, {
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
        console.log(`Dados: ${data.username}`)
        try{
            const response = await axios.post(`${API_URL}/api/professores`, {
                'ni': data.ni,
                'nome': data.username,
                'password': data.password,
                'password2': data.password2,
                'telefone': data.telefone,
                'categoria': data.categoria,
                'data_nascimento': data.data_nascimento,
                'data_contratação': data.data_contratação
            },{
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-Type': 'application/json'
                },
            });
            closeModal();
            obterDados();
        }catch(error){
            console.error('erro no cadastro', data);
            alert('erro ao cadastrar')
        }
    }
    

    const deletarDado = async (IDNTY) => {
        try{
           const response = await axios.delete(`${API_URL}/api/professores/${IDNTY}`, {
                headers: {
                    'Authorization': `Bearer ${access_token}`,
                    'Content-Type': 'application/json'
                  }
            });
            obterDados();
        }catch (error) {
            console.log('errinho: ', IDNTY, " - ",  error)
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
                <tbody className={estilo.centro}>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.categoria}</td>
                            <td>{item.ni}</td>
                            <td>{item.telefone}</td>
                            <td>{item.data_nascimento}</td>
                            <td>{item.data_contratação}</td>
                            <td>
                            <Link to={`/professores/${item.id}`} >
                                <button className={estilo.editar}>Editar</button>
                            </Link>
                            </td>
                            <td><button className={estilo.deletar} onClick={() =>deletarDado(item.id)}>Deletar</button></td>
                        </tr>
                    ))}
                </tbody>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className={estilo.modal}
                    contentLabel="Modal registro professor"
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
                {/* <button className={estilo.criar} onClick={() => handleOpenModal(1, "update")}>Criar Novo</button> */}
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
