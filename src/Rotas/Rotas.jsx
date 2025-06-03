import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Inicial } from '../Componentes/Inicial';
import { Home } from '../Paginas/Home';
import { Cadastro } from '../Paginas/Cadastro';
import { Professores } from '../Paginas/Professores';
import { Ambientes } from '../Paginas/Ambientes';
import { Disciplinas } from '../Paginas/Disciplinas';
import { ProfessorEditar } from '../Paginas/ProfessorEditar';
import { DisciplinaEditar } from '../Paginas/DisciplinaEditar';
import { AmbienteEditar } from '../Paginas/AmbienteEditar';

export function Rotas(){
    return(
            <Routes>
                <Route path="/" element={<Inicial/>}>
                    <Route path='/' index element={<Home/>}/>
                    <Route path='ambientes' element={<Ambientes/>}/>
                    <Route path='cadastro' element={<Cadastro/>}/>
                    <Route path='disciplinas' element={<Disciplinas/>}/>
                    <Route path='login' element={<Login/>}/>
                    <Route path='professores' element={<Professores/>}/>
                    <Route path='professores/:id' element={<ProfessorEditar/>}/>
                    <Route path='disciplinas/:id' element={<DisciplinaEditar/>}/>
                    <Route path='ambientes/:id' element={<AmbienteEditar/>}/>
                </Route>
            </Routes>
    )
}