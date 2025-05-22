import estilo from './Cadastro.module.css'
import axios from 'axios';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom'


const API_URL = 'http://127.0.0.1:8000'
export function Cadastro(){
        const navigate = useNavigate();
        const [formData,setFormData] = useState({
            ni: '',
            nome: '',
            password: '',
            password2: '',
            telefone: '',
            categoria: '',
            data_nascimento: '',
            data_contratação: ''
        });


        const handleChange = (e) => {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        };
        const handleSubmit = async (e) => {
            e.preventDefault();
            try{
                const response = await axios.post(`${API_URL}/api/cadastro/`,formData)
                console.log('Dados Enviados sucesso: ', response.data)
                navigate('/home');
            } catch (error){
                console.error('Erro ao enviar dados: ',error,formData)
            }
            
        };
    return(
        <main className={estilo.container}>
                <form onSubmit={handleSubmit} className={estilo.formFlex}>
                    <h2 className={estilo.titulo}>Cadastre-se</h2>
                    <label className={estilo.label}>Nome

                    </label>
                    <input className={estilo.input} type="text" name='nome' placeholder='Nome de usuario' 
                        defaultValue={formData.nome} 
                        onChange={handleChange} />

                    <div className={estilo.formGrid}>
                        
                        <label className={estilo.label}>Numero de Identificação
                            <input className={estilo.input} type="text" name='ni' placeholder='Numero de identificação'
                            defaultValue={formData.ni}
                            onChange={handleChange}/>
                        </label>

                        <label className={estilo.label}>Telefone 
                            <input className={estilo.input} type="text" name='telefone' placeholder='Telefone'
                            defaultValue={formData.telefone}
                            onChange={handleChange}/>
                        </label>

                        <label className={estilo.label}>Data Nascimento
                            <input className={estilo.input} type="date" name='data_nascimento' placeholder='Data de nascimento' 
                            defaultValue={formData.data_nascimento}
                            onChange={handleChange}/>
                        </label>
                        <label >Data de contratação
                            <input className={estilo.input} type="date" name='data_contratação' placeholder='Data de contratação'
                            defaultValue={formData.data_contratação} 
                            onChange={handleChange}/>
                        </label>
                        <label >Senha 
                            <input className={estilo.input} type="password" name='password' placeholder='Senha'
                                defaultValue={formData.password}
                                onChange={handleChange} />
                        </label>
                        <label >Confirme sua senha
                            <input className={estilo.input} type="password" name='password2' placeholder='Confirme sua Senha'
                                defaultValue={formData.password2} 
                                onChange={handleChange} />
                        </label>

                        
                        <label className={estilo.label}>
                            Usuario comum
                            <input 
                            type="radio" 
                            name="categoria" 
                            value="C"
                            checked={formData.categoria  === "C"}
                            onChange={handleChange}/>
                        </label>
                        <label className={estilo.label}>
                            Usuario gestor
                            <input 
                            type="radio"
                            name="categoria"
                            value="G"
                            checked={formData.categoria === "G"}
                            onChange={handleChange}/>
                        </label>
                        <p>Selected : {formData.categoria}</p>
                    </div>
                    <input className={estilo.submit} type="submit" />
                </form>
        </main>
    )
}