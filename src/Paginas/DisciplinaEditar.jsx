import estilos from './DisciplinaEditar.module.css';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import axios from 'axios';


import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';


const schemaDisciplina = z.object({
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
});

export function DisciplinaEditar() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(schemaDisciplina),
    });

    useEffect(() => {
        async function fetchDisciplina() {
            const token = localStorage.getItem('access_token');
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/disciplina/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(response.data)
                reset(response.data); 
            } catch (error) {
                console.error('Erro ao carregar disciplina', error);
                alert('Erro ao carregar dados do disciplina');
            }
        }

        fetchDisciplina();
    }, [id, reset]);

    async function onSubmit(data) {
        console.log(data.telefone)
        const token = localStorage.getItem('access_token');
        try {
            await axios.put(`http://127.0.0.1:8000/api/disciplina/${id}`, {
                'nome': data.nome,
                'curso':data.curso,
                'carga_horaria':data.carga_horaria,
                'descrição':data.descrição,
                'professor':data.professor,
                'ambiente':data.ambiente
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            alert('Disciplina atualizada com sucesso!');
            navigate('/disciplinas');
        } catch (error) {
            console.error('Erro ao atualizar disciplina', error);
            alert('Erro ao atualizar disciplina');
        }
    }

    return (
        <div className={estilos.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={estilos.formFlex}>
            <h2 className={estilos.titulo}>Cadastre uma disciplina</h2>
            <label className={estilos.label}>Nome da disciplina</label>
            <input className={estilos.input} {...register('nome')} type="text" name='nome' placeholder='Nome'/>
            {errors.nome && <p className={estilos.erro}>{errors.nome.message}</p>}
            <div className={estilos.formGrid}>
                <label className={estilos.label}>Curso da disciplina
                    <input className={estilos.input} type="text" name='curso' placeholder='Curso'
                    {...register('curso')}/>
                    {errors.curso && <p className={estilos.erro}>{errors.curso.message}</p>}
                </label>

                <label className={estilos.label}> Carga Horaria da disciplina
                    <input className={estilos.input} type="number" name='carga_horaria' placeholder='Carga Horaria'
                    {...register('carga_horaria', {
                        setValueAs: (carga_horaria) => Number(carga_horaria),
                        })}/>
                    {errors.carga_horaria && <p className={estilos.erro}>{errors.carga_horaria.message}</p>}
                </label>

                <label className={estilos.label}>Descrição da disciplina
                    <input className={estilos.input} type="text" name='descrição' placeholder='Descrição' 
                    {...register('descrição')}/>
                    {errors.descrição && <p className={estilos.erro}>{errors.descrição.message}</p>}
                </label>
                <label >Numero do Professor
                    <input className={estilos.input} type="number" name='professor' placeholder='Numero Professor'
                    {...register('professor', {
                        setValueAs: (professor) => Number(professor),
                        })}/>
                    {errors.professor && <p className={estilos.erro}>{errors.professor.message}</p>}
                </label>
                <label >Numero de ambiente reservado
                    <input className={estilos.input} type="number" name='ambiente' placeholder='Numero Ambiente'
                        {...register('ambiente', {
                            setValueAs: (ambiente) => Number(ambiente),
                            })} />
                        {errors.ambiente && <p className={estilos.erro}>{errors.ambiente.message}</p>}
                </label>

            </div>
            <input className={estilos.submit} type="submit" />
        </form>
        </div>
    );
}