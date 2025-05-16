import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../componentes/Inicial';
import { Cadastro } from '../Paginas/Cadastro';
import { Professores } from '../Paginas/Professores';
import { Ambientes } from '../Paginas/Ambientes';
import { Disciplinas } from '../Paginas/Disciplinas';

export function Rotas(){
    return(
            <Routes>
                <Route path="/" element={<Inicial/>}>
                    <Route path='ambientes' element={<Ambientes/>}/>
                    <Route path='cadastro' element={<Cadastro/>}/>
                    <Route path='disciplinas' element={<Disciplinas/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route index element={<Professores/>}/>
                </Route>
            </Routes>
    )
}