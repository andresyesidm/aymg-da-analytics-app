import React from "react";
import logo from '../../../assets/img/Logo.png';
import './ml-header.scss'

function MlHeader(): JSX.Element {
    return (
        <div className='ml-header'>
            <img className='ml-header__icon' src={logo} alt='Logo icon'/>
            <div className='ml-header__title'>Análisis de Datos</div>
        </div>
    );
}

export {MlHeader};
