import axios from 'axios';
import React, {use, useState} from 'react';
import estilo from './Login.module.css';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {data, useNavigate} from 'react-router-dom'

// URL base da api
const API_URL = 'http://127.0.0.1:8000'

// Validação zod
const schemaLogin = z.object({
    username: z.string()
        .min(1,'Informe seu usuário')
        .max(15, 'Informe um usuário de até 15 caracteres'),
    password: z.string()
        .min(1,'Informe sua senha')
        .max(15, 'Informe uma senha de até 15 caracteres'),
})

export function Login(){
    // Navegação
    const navigate = useNavigate();

    // Recebe dados do form e valida ou retorna erro
    const{
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: zodResolver(schemaLogin)
    })

    //  Função de post de dados validados
    const enviarDadosFormulario = async(data) =>{
        console.log(`Dados: ${data}`)
        try{
            const response = await axios.post(`${API_URL}/api/token/`,{
                            username: data.username,
                            password: data.password
                        });
            const {access, refresh, professor } = response.data;
            localStorage.setItem('access_token', access);
            localStorage.setItem('refresh_token', refresh);
            localStorage.setItem('categoria', professor.categoria);
            // localStorage.setItem('user_id', user.id);
            localStorage.setItem('username',professor.username)
            // console.log("daditos: "+ professor.id)
            navigate('/')
        }catch(error){
            console.error('erro no login', error);
            alert('credenciais inválidas')
        }
    }


    return(
        <main className={estilo.container}>
            <form onSubmit={handleSubmit(enviarDadosFormulario)} className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Entrar</h2>
                
                <label>Nome</label>
                <input className={estilo.input} {...register('username')} name='username' type="text"  placeholder='Nome de usuario'/>
                {errors.username && <p className={estilo.erro}>{errors.username.message}</p>}
                
                <label>Senha</label>
                <input className={estilo.input} 
                {...register('password')}
                name='password' type="password" placeholder='Senha'/>
                {errors.password && <p className={estilo.erro}>{errors.password.message}</p>}

                <button className={estilo.submit} type="submit">Enviar</button>
            </form>
        </main>

    )
}