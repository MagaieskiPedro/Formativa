import { useState } from 'react'
import estilo from './Menu.module.css'
import { useEffect } from 'react'
import axios from "axios"

const API_URL = 'http://127.0.0.1:8000'

export function Ambientes(){

    return(
        <main className={estilo.container}>
            
            <table>
                    <tr>
                        <th>
                            Data Inicio
                        </th>
                        <th>
                           Data Termino
                        </th>
                        <th>
                            Periodo
                        </th>
                        <th>
                            Sala
                        </th>
                        <th>
                            Professor
                        </th>
                    </tr>
                    <tr>
                        <td>
                            ???
                        </td>
                        <td>
                            ???
                        </td>
                        <td>
                            ???
                        </td>
                        <td>
                            ???
                        </td>
                        <td>
                            ???
                        </td>
                    </tr>
            </table>
        </main>
    )
}