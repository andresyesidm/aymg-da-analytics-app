import React, {Fragment, useCallback, useEffect, useState} from "react";
import {MlHeader} from "../../molecules/ml-header/ml-header";
import {AtButton} from "../../atoms/at-button/at-button";
import {useHistory} from "react-router-dom";
import {AtTable} from "../../atoms/at-table/at-table";
import {ILoadProcessResponse} from "../../../domain/ILoadProcessResponse";
import {AtModal} from "../../atoms/at-modal/at-modal";
import './or-dashboard.scss'

function OrDashboard(): JSX.Element {
    const [data, setData] = useState(null);
    const [file, setFile] = useState('');
    const [tookTime, setTookTime] = useState(0);
    const [loader, setLoader] = useState(false);
    const history = useHistory();
    console.log(history.location.state)
    const initialTimeStamp = new Date().getTime();
    const fetchData = useCallback( () => {
        setLoader(true)
        window.dragApi.getData().then((res: ILoadProcessResponse) => {
            setData(res.data)
            setFile(res.filename)
            setTookTime(res.timestamp -initialTimeStamp)
            setLoader(false)
        });
        window.uploadFile.getData().then((res) => {
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

    return (
        <Fragment>
            <div className='or-dashboard'>
                <MlHeader/>
                <div className='main'>
                    {data ? <AtTable dataSet={data} filename={file} fullView={true} tookTime={tookTime}/>
                        : <AtTable dataSet={{}} filename={'Archivo no encontrado'} fullView={false} tookTime={0}/>}
                    <div className='main__button'>
                        <AtButton text='Finalizar Analisis' onClicked={backToHome}/>
                    </div>
                </div>
            </div>
            <AtModal isVisible={loader} isLoader={true}/>
        </Fragment>
    );
}

export {OrDashboard}