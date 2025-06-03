import estilos from './AmbienteEditar.module.css';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


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
});

export function AmbienteEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaAmbiente),
    });
    console.log(id)

    useEffect(() => {
        async function fetchAmbiente() {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/reservaAmbiente/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data)
                reset(response.data); 
            } catch (error) {
                console.error('Erro ao carregar ambiente', error);
                alert('Erro ao carregar dados do ambiente');
            }
        }

        fetchAmbiente();
    }, [id, reset]);

    async function onSubmit(data) {
        console.log(data.telefone)
        const token = localStorage.getItem('access_token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/reservaAmbiente/${id}`, {
                'data_inicio': data.data_inicio,
                'data_termino':data.data_termino,
                'periodo':data.periodo,
                'sala':data.sala,
                'professor':data.professor,
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Ambiente atualizado com sucesso!');
            navigate('/ambientes');
        } catch (error) {
            console.error('Erro ao atualizar Ambiente', error);
            alert('Erro ao atualizar Ambiente');
        }
    }

    return (
        <div className={estilos.container}>
            <form onSubmit={handleSubmit(onSubmit)} className={estilos.formFlex}>
                <h2 className={estilos.titulo}>Cadastre um ambiente</h2>
                <div className={estilos.formGrid}>
                    <label className={estilos.label}>Data de inicio de uso
                        <input className={estilos.input} 
                        {...register('data_inicio')} type="date" name='data_inicio' placeholder='data inicio'/>
                        {errors.data_inicio && <p className={estilos.erro}>{errors.data_inicio.message}</p>}
                    </label>
                    <label className={estilos.label}>Data de termino de uso
                        <input className={estilos.input} type="date" name='data_termino' placeholder='data termino'
                        {...register('data_termino')}/>
                        {errors.data_termino && <p className={estilos.erro}>{errors.data_termino.message}</p>}
                    </label>

                    <label className={estilos.label}>Sala de reservada
                        <input className={estilos.input} type="text" name='sala' placeholder='Sala'
                        {...register('sala')}/>
                        {errors.telefone && <p className={estilos.erro}>{errors.telefone.message}</p>}
                    </label>

                    <label >Numero do Professor
                        <input className={estilos.input} type="number" name='professor' placeholder='Numero Professor'
                        {...register('professor', {
                            setValueAs: (professor) => Number(professor),
                            })}/>
                        {errors.professor && <p className={estilos.erro}>{errors.professor.message}</p>}
                    </label>

                    <select className={estilos.select} {...register('periodo')}>
                        Periodo
                        <option value="M">Manhã</option>
                        <option value="T">Tarde</option>
                        <option value="N">Noite</option>
                    </select>
                </div>
                <input className={estilos.submit} type="submit" />
            </form>
        </div>
    );
}