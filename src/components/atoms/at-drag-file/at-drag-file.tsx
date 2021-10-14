import React, {useEffect} from "react";
import downIco from "../../../assets/img/Download.svg"
import './at-drag-file.scss'
import {useHistory} from "react-router-dom";

function AtDragFile(): JSX.Element {
    const history = useHistory();
    useEffect(() => {
       const dragEl = document.querySelector('#drag');
        dragEl.addEventListener('drop', (event: DragEvent) => {
            event.preventDefault();
            event.stopPropagation();
            dragEl.classList.remove('inner-drag--active')
            console.log(event.dataTransfer.files.item(0).path);
            window.dragApi.loadDropFile(event.dataTransfer.files.item(0).path);
            history.push('/dashboard')
        });

        dragEl.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
        });

        dragEl.addEventListener('dragenter', () => {
            dragEl.classList.add('inner-drag--active');
            console.log('File is in the Drop Space');
        });

        dragEl.addEventListener('dragleave', () => {
            dragEl.classList.remove('inner-drag--active')
            console.log('File has left the Drop Space');
        });
    });
    return (
        <div className='at-drag'>
            <div id='drag' className='inner-drag' draggable={true}>
                <img className='inner-drag__icon' src={downIco} alt='Drag Icon'/>
                <div className='inner-drag__text'>Cargar archivo aquí</div>
            </div>
        </div>
    );
}

export {AtDragFile};