import React, {FormEvent, Fragment, useCallback, useEffect, useRef, useState} from "react";
import {MlHeader} from "../../molecules/ml-header/ml-header";
import {AtTable} from "../../atoms/at-table/at-table";
import {AtButton} from "../../atoms/at-button/at-button";
import {AtModal} from "../../atoms/at-modal/at-modal";
import {useHistory} from "react-router-dom";
import {ILoadProcessResponse} from "../../../domain/ILoadProcessResponse";
import './or-fullview.scss'

function OrFullview(): JSX.Element {
    let select0: HTMLSelectElement;
    let select1: HTMLSelectElement;
    let select2: HTMLSelectElement;
    let input: HTMLInputElement;
    const [data, setData] = useState(null);
    const [file, setFile] = useState('');
    const [tookTime, setTookTime] = useState(0);
    const [loader, setLoader] = useState(false);
    const [modal, setModal] = useState(false);
    const [mTitle, setMTitle] = useState('');
    const [mText, setMText] = useState('');
    const [correlation, setCorrelation] = useState(null)
    const history = useHistory();
    const initialTimeStamp = new Date().getTime();
    const fetchData = useCallback(() => {
        setLoader(true)
        window.dragApi.getData().then((res: ILoadProcessResponse) => {
            setData(res.data)
            setFile(res.filename)
            setTookTime(res.timestamp -initialTimeStamp)
            setLoader(false)
        });
    }, []);
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const backToHome = () => {
        history.push('/');
    }
    let sampleNumber = 0;
    let columnTtest = '';
    let columnIndTtest1 = '';
    let columnIndTtest2 = '';
    const onInputEntry = ($event: any) => {
        sampleNumber = $event.nativeEvent.data;
        console.log($event)
    }

    const onSelectedInput1 = ($event: any) => {
        columnTtest = $event.target.value;
    }
    const onSelectedInput2 = ($event: any) => {
        columnIndTtest1 = $event.target.value;
    }
    const onSelectedInput3 = ($event: any) => {
        columnIndTtest2 = $event.target.value;
    }

    const onTtest = () => {
        setModal(false)
        setLoader(true)
        input.value = "";
        select0.value = '0'
        window.ttest.execute(file, sampleNumber, columnTtest);
        window.ttest.result().then((res) => {
            setLoader(false)
            setMTitle('One Sample TTest');
            setMText(`El p-value es: ${res.data}`)
            setModal(true)
        });
    }

    const onTtestInd = () => {
        setLoader(true)
        setModal(false)
        select1.value = '0';
        select2.value = '0';
        window.ttestInd.execute(file, columnIndTtest1, columnIndTtest2);
        window.ttestInd.result().then((res) => {
            setLoader(false)
            setMTitle('Pairing TTest');
            setMText(`El p-value es: ${res.data}`)
            setModal(true)
        });
    }

    const onCorrelation = () => {
        setLoader(true)
        window.correlation.execute(file);
        window.correlation.result().then((res) => {
            setCorrelation(res.data);
            setLoader(false)
        });
    }
    return (
        <Fragment>
            <div className='or-fullview'>
                <MlHeader/>
                <div className='main'>
                    {data ? <AtTable dataSet={data} filename={file} fullView={false} tookTime={tookTime}/>
                        : <AtTable dataSet={{}} filename={'Archivo no encontrado'} fullView={false} tookTime={0}/>}
                    {correlation ? <AtTable dataSet={correlation} filename={'Correlation Test'} fullView={false} tookTime={0}/>
                        : ''}
                    <div className='main__side'>
                        <div className='group'>
                            <div className='group__title'>TTest</div>
                            <div className='group__label'># de datos de muestra: <input ref={ el => input = el} id='sample' type='Number'
                                                                                        onChange={onInputEntry}
                            /></div>
                            <div className='group__label'>Columna:
                                <select ref={ el => select0 = el} onChange={onSelectedInput1}>
                                    <option value={0}>Seleccione</option>
                                    {data && Object.keys(data).map((key) => {
                                        return (
                                                <option value={key}>{key}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='group__button'><AtButton text={'Ejecutar'} onClicked={onTtest}/></div>
                        </div>
                        <div className='group'>
                            <div className='group__title'>Paired TTest</div>
                            <div className='group__label'>Columna 1:
                                <select ref={ el => select1 = el} onChange={onSelectedInput2}>
                                    <option value={0}>Seleccione</option>
                                    {data && Object.keys(data).map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='group__label'>Columna 2:
                                <select ref={ el => select2 = el} onChange={onSelectedInput3}>
                                    <option value={0}>Seleccione</option>
                                    {data && Object.keys(data).map((key) => {
                                        return (
                                            <option value={key}>{key}</option>
                                        )
                                    })}
                                </select>
                            </div>
                            <div className='group__button'><AtButton text={'Ejecutar'} onClicked={onTtestInd}/></div>
                        </div>
                        <div className='group'>
                            <div className='group__title'>Correlation TTest</div>
                            <div className='group__button'><AtButton text={'Ejecutar'} onClicked={onCorrelation}/></div>
                        </div>
                        <div className='main__button'>
                            <AtButton text='Finalizar Analisis' onClicked={backToHome}/>
                        </div>
                    </div>
                </div>
            </div>
            <AtModal isVisible={loader} isLoader={true}/>
            <AtModal isVisible={modal} title={mTitle} text={mText}/>
        </Fragment>
    );
}

export {OrFullview}
