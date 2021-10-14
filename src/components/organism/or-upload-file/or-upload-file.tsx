import React from "react";
import {MlHeader} from "../../molecules/ml-header/ml-header";
import {AtDragFile} from "../../atoms/at-drag-file/at-drag-file";
import {AtButton} from "../../atoms/at-button/at-button";
import './or-upload-file.scss'
import {useHistory} from "react-router-dom";

function OrUploadFile(): JSX.Element {
    const history = useHistory();
    const onClicked = () => {
        window.uploadFile.loadFile();
        history.push('/dashboard');
    }
    return (
        <div className='or-upload-file'>
            <MlHeader/>
            <div className='main'>
                <AtDragFile/>
                <div className='main__button'>
                    <AtButton text='Cargar archivo' onClicked={onClicked}/>
                </div>
            </div>
        </div>
    );
}

export {OrUploadFile}
