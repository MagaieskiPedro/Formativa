import axios from 'axios';
import React, {use, useState} from 'react';
import estilo from './Login.module.css';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {data, useNavigate} from 'react-router-dom'

const API_URL = 'http://127.0.0.1:8000'

const schemaLogin = z.object({
    username: z.string()
        .min(1,'Informe seu usuário')
        .max(15, 'Informe até 25 caracteres'),
    password: z.string()
        .min(1,'Informe seu usuário')
        .max(15, 'Informe até 25 caracteres'),
})

export function Login(){
    const navigate = useNavigate();

    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    })

    async function obterDados(formData){
        console.log(`dados: ${formData}`)

        try{
            const response = await axios.post(`${API_URL}/api/token/`,{
                username: data.username,
                password: data.password
            });
            const {acess, refresh, user} = response.data;
            localStorage.getItem('access_token', acess);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('categoria', user.categoria);
            localStorage.setItem('user_id', user.id);
            localStorage.setItem('username',username)

            console.log('login realizado')

            navigate('/inicial');
        }catch(error){
            console.error('erro no login', error);
            alert('credenciais inválidas')
        }
    }

    // const [formData,setFormData] = useState({
    //     username: '',
    //     password: ''
    // });
    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try{
    //         const response = await axios.post(`${API_URL}/api/token/`,formData)
    //         console.log('Dados Enviados sucesso: ', response.data)
    //     } catch (error){
    //         console.error('Erro ao enviar dados: ',error)
    //     }
    // };

    return(
        <main className={estilo.container}>
            <form onSubmit={handleSubmit} className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Entrar</h2>
                
                <label>Nome</label>
                <input className={estilo.input} name='username' type="text" {...register('username')} placeholder='Nome de usuario'/>
                {errors.username && <p>{errors.username.message}</p>}
                
                <label>Senha</label>
                <input className={estilo.input} {...register('username')} name='password' type="password" placeholder='Senha'/>
                {errors.password && <p>{errors.password.message}</p>}
                <button className={estilo.submit} type="submit">Enviar</button>
            </form>
        </main>
    )
}