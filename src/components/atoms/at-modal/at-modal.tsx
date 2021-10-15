import React, {useMemo, useState} from "react";
import loader from '../../../assets/img/Loader.png'
import './at-modal.scss'
import {useHistory} from "react-router-dom";
import {AtButton} from "../at-button/at-button";
import info from '../../../assets/img/Info.svg'

interface ModalPops {
    isVisible: boolean;
    isLoader?: boolean;
    title?: string;
    text?: string;
}

function AtModal({isVisible, isLoader, title, text}: ModalPops): JSX.Element {
    const history = useHistory();
    const [visible, setVisible] = useState(false)
    useMemo(() => {
        setVisible(isVisible);
    }, [isVisible])

    const closeModal = () => {
        setVisible(false);
    }

    return (
        <div className={`at-modal ${!visible ? 'at-modal--hidden' : ''}`}>
            {isLoader ? <img className='at-modal__icon' src={loader} alt="Loader" onClick={() => history.push('/')}/> :
                <div className='wrapper'>
                    <div className='header-mod'>
                        <div className='header-mod__title'>{title}</div>
                        <img className='header-mod__icon' src={info} alt={'Info icon'}/>
                    </div>
                    <div className='wrapper_text'>{text}</div>
                    <div className='wrapper__button'>
                        <AtButton text={'Cerrar'} onClicked={closeModal}/>
                    </div>
                </div>
            }
        </div>
    )
}

export {AtModal}
