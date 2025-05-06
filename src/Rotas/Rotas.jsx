import {Routes, Route} from 'react-router-dom';
import { Login } from '../Paginas/Login';
import { Menu } from '../Paginas/Menu';
import { Inicial } from '../componentes/Inicial';

export function Rotas(){
    return(
            <Routes>
                <Route path="/" element={<Inicial/>}>
                    <Route index element={<Menu/>}/>
                    <Route path='login' element={<Login/>}/>
                </Route>
            </Routes>
    )
}