import axios from 'axios';
import React, {useState} from 'react';
import estilo from './Login.module.css'

const API_URL = 'http://127.0.0.1:8000'

export function Login(){
    
    const [formData,setFormData] = useState({
        username: '',
        password: ''
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post(`${API_URL}/api/token/`,formData)
            console.log('Dados Enviados sucesso: ', response.data)
        } catch (error){
            console.error('Erro ao enviar dados: ',error)
        }
    };
    return(
        <main className={estilo.container}>
            <form onSubmit={handleSubmit} className={estilo.formFlex}>
                <h2 className={estilo.titulo}>Entrar</h2>
                <input className={estilo.input} name='username' type="text" 
                value={formData.username} 
                onChange={handleChange} placeholder='Nome de usuario'/>
                <input className={estilo.input} name='password' type="password" 
                value={formData.password}
                onChange={handleChange} placeholder='Senha'/>
                <input className={estilo.submit} type="submit"/>
            </form>
        </main>
    )
}