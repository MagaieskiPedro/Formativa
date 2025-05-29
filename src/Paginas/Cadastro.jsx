import estilo from './Cadastro.module.css'
import axios from 'axios';
import React, {use,useState} from 'react';

import {useForm} from 'react-hook-form';
import {z} from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {useNavigate} from 'react-router-dom'

// Url base da api
const API_URL = 'http://127.0.0.1:8000'

// Validação zod
const schemaLogin = z.object({
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


export function Cadastro(){
        // navegação por rotas 
        const navigate = useNavigate();

        // recebe dados do formulario e valida/ devolve erros
        const{
                register,
                handleSubmit,
                formState: { errors }
        } = useForm({
                resolver: zodResolver(schemaLogin)
        })

        // Função de post do formulario
       const enviarDadosFormulario = async(data) =>{
            console.log(`Dados: ${data}`)
            try{
                const response = await axios.post(`${API_URL}/api/cadastro/`,{
                                'ni': data.ni,
                                'nome': data.username,
                                'password': data.password,
                                'password2': data.password2,
                                'telefone': data.telefone,
                                'categoria': data.categoria,
                                'data_nascimento': data.data_nascimento,
                                'data_contratação': data.data_contratação
                            });
                const { professor } = response.data;
                navigate('/')
    
            }catch(error){
                console.error('erro no cadastro: ', error);
                alert('erro no cadastro:')
            }
        }

    return(
        <main className={estilo.container}>
                <form onSubmit={handleSubmit(enviarDadosFormulario)} className={estilo.formFlex}>
                    <h2 className={estilo.titulo}>Cadastre-se</h2>
                    <label className={estilo.label}>Nome

                    </label>
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
        </main>
    )
}