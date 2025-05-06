import { Cabecalho } from "./Cabecalho";
import { BarraNavegacao } from "./BarraNavegacao";
//Outlet é um espaço que serve para renderizar o componente da rota, se clicar no link vai pra rota
import { Outlet } from "react-router-dom";
import { Rodape } from "./Rodape";
//estrutura
export function Inicial(){
    return(
        <>
            <Cabecalho/>
            <BarraNavegacao/>
            <Outlet/>
            <Rodape/>
        </>
    )
}