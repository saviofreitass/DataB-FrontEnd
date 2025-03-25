import { useState } from 'react'
import style from './Registro.module.css'

export const Registro = ({ onClose }) => {

    return(
        <div className={style.container}>
            <div>
                <input type="text" />
                <input type="text" />
                <input type="text" />
                <button
                    onClick={onClose}>Fechar</button>
            </div>
        </div>
    )
}