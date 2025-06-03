import estilos from './ProfessorEditar.module.css';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const schemaProfessor = z.object({
    username: z.string()
        .min(1,'Informe seu nome')
        .max(15, 'Informe um nome de até 15 caracteres'),
    ni: z.number()
        .gte(1,'Informe seu numero de identificação')
        .lte(999999999999999, 'Informe um numero de até 15 caracteres'),
    telefone: z.number()
        .gte(1,'Informe seu telefone')
        .lte(999999999999999, 'Informe um telefone de até 15 caracteres'),
    data_nascimento: z.string()
        .min(8,'Informe sua data de nascimento'),
    data_contratação: z.string()
        .min(8,'Informe sua data de nascimento'),
    password: z.string()
        .min(1,'Informe sua senha')
        .max(15, 'Informe uma senha de até 15 caracteres'),
    password2: z.string({message:'Digite algo'})
        .min(1,'Confirme sua senha')
        .max(15,'Confirme uma senha de até 15 caracteres'),
    categoria: z.string()
        .min(1,"categoria faltando")
   
});

export function ProfessorEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaProfessor),
    });

    useEffect(() => {
        async function fetchProfessor() {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/professores/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data)
                reset(response.data); 
            } catch (error) {
                console.error('Erro ao carregar professor', error);
                alert('Erro ao carregar dados do professor');
            }
        }

        fetchProfessor();
    }, [id, reset]);

    async function onSubmit(data) {
        console.log(data.telefone)
        const token = localStorage.getItem('access_token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/professores/${id}`, {
                'ni': data.ni,
                'nome': data.username,
                'username': data.username,
                'password': data.password,
                'password2': data.password2,
                'telefone': data.telefone,
                'categoria': data.categoria,
                'data_nascimento': data.data_nascimento,
                'data_contratação': data.data_contratação
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Professor atualizado com sucesso!');
            navigate('/professores');
        } catch (error) {
            console.error('Erro ao atualizar professor', error);
            alert('Erro ao atualizar professor');
        }
    }

    return (
        <div className={estilos.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={estilos.formFlex}>
                <h2 className={estilos.titulo}>Cadastre-se</h2>
                <label className={estilos.label}>Nome</label>
                <input className={estilos.input} {...register('username')} type="text" name='username' placeholder='Nome de usuario'/>
                {errors.username && <p className={estilos.erro}>{errors.username.message}</p>}
                <div className={estilos.formGrid}>
                    <label className={estilos.label}>Numero de Identificação
                        <input className={estilos.input} type="number" name='ni' placeholder='Numero de identificação'
                        {...register('ni', {
                            setValueAs: (ni) => Number(ni),
                            })}/>
                        {errors.ni && <p className={estilos.erro}>{errors.ni.message}</p>}
                    </label>

                    <label className={estilos.label}>Telefone 
                        <input className={estilos.input} type="number" name='telefone' placeholder='Telefone'
                        {...register('telefone', {
                            setValueAs: (telefone) => Number(telefone),
                            })}/>
                        {errors.telefone && <p className={estilos.erro}>{errors.telefone.message}</p>}
                    </label>

                    <label className={estilos.label}>Data Nascimento
                        <input className={estilos.input} type="date" name='data_nascimento' placeholder='Data de nascimento' 
                        {...register('data_nascimento')}/>
                        {errors.data_nascimento && <p className={estilos.erro}>{errors.data_nascimento.message}</p>}
                    </label>
                    <label >Data de contratação
                        <input className={estilos.input} type="date" name='data_contratação' placeholder='Data de contratação'
                        {...register('data_contratação')}/>
                        {errors.data_contratação && <p className={estilos.erro}>{errors.data_contratação.message}</p>}
                    </label>
                    <label >Senha 
                        <input className={estilos.input} type="password" name='password' placeholder='Senha'
                            {...register('password')} />
                            {errors.password && <p className={estilos.erro}>{errors.password.message}</p>}
                    </label>
                    <label >Confirme sua senha
                        <input className={estilos.input} type="password" name='password2' placeholder='Confirme sua Senha'
                            {...register('password2')}/>
                            {errors.password2 && <p className={estilos.erro}>{errors.password2.message}</p>}
                    </label>

                    <select className={estilos.select} {...register('categoria')}>
                        <option value="C">Comum</option>
                        <option value="G">Gestor</option>
                    </select>
                </div>
                <input className={estilos.submit} type="submit" />
            </form>
        </div>
    );
}