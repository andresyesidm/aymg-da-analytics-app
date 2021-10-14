import React, {FormEvent, Fragment, useCallback, useEffect, useState} from "react";
import {MlHeader} from "../../molecules/ml-header/ml-header";
import {AtTable} from "../../atoms/at-table/at-table";
import {AtButton} from "../../atoms/at-button/at-button";
import {AtModal} from "../../atoms/at-modal/at-modal";
import {useHistory} from "react-router-dom";
import {ILoadProcessResponse} from "../../../domain/ILoadProcessResponse";
import './or-fullview.scss'

function OrFullview(): JSX.Element {
    const [data, setData] = useState(null);
    const [file, setFile] = useState('');
    const [tookTime, setTookTime] = useState(0);
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    const initialTimeStamp = new Date().getTime();
    const fetchData = useCallback(async () => {
        //setLoader(true)
        let res: ILoadProcessResponse = await window.dragApi.getData();
        if (!res)
            res = await window.uploadFile.getData();
        setData(res.data);
        setFile(res.filename);
        setTookTime(res.timestamp - initialTimeStamp);
    }, []);
    useEffect(() => {
        fetchData().finally(() => setLoader(false));
    }, [fetchData]);

    const backToHome = () => {
        history.push('/');
    }
    let sampleNumber: number;
    const onInputEntry = ($event: FormEvent) => {
        console.log($event)
    }

    /*const onTtest = () => {
      const val = (document.querySelector('#sample') as HTMLElement).value;
    }*/
    return (
        <Fragment>
            <div className='or-fullview'>
                <MlHeader/>
                <div className='main'>
                    {data ? <AtTable dataSet={data} filename={file} fullView={false} tookTime={tookTime}/>
                        : <AtTable dataSet={{}} filename={'Archivo no encontrado'} fullView={false} tookTime={0}/>}
                    <div className='main__side'>
                        <div className='group'>
                            <div className='group__title'>TTest</div>
                            <div className='group__label'># de datos de muestra: <input id='sample' type='Number'
                                                                                        onInput={onInputEntry}/></div>
                            <div className='group__button'><AtButton text={'Ejecutar'} onClicked={() => true}/></div>
                        </div>
                        <div className='group'>
                            <div className='group__title'>Paired TTest</div>
                            <div className='group__label'>Columna 1:
                                <select>
                                    <option>EEEE</option>
                                </select>
                            </div>
                            <div className='group__label'>Columna 2:
                                <select>
                                    <option>EEEE</option>
                                </select>
                            </div>
                            <div className='group__button'><AtButton text={'Ejecutar'}/></div>
                        </div>
                        <div className='group'>
                            <div className='group__title'>Correlation TTest</div>
                            <div className='group__button'><AtButton text={'Ejecutar'}/></div>
                        </div>
                        <div className='main__button'>
                            <AtButton text='Finalizar Analisis' onClicked={backToHome}/>
                        </div>
                    </div>
                </div>
            </div>
            <AtModal isVisible={loader}/>
        </Fragment>
    );
}

export {OrFullview}
