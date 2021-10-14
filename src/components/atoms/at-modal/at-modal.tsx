import React from "react";
import loader from '../../../assets/img/Loader.png'
import './at-modal.scss'

interface ModalPops {
    isVisible: boolean;
}

function AtModal({isVisible}: ModalPops): JSX.Element {
    return (
        <div className={`at-modal ${!isVisible ? 'at-modal--hidden' : ''}`}>
            <img className='at-modal__icon' src={loader} alt="Loader"/>
        </div>
    )
}

export {AtModal}
