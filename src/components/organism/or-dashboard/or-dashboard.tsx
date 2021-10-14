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
    const initialTimeStamp = new Date().getTime();
    const fetchData = useCallback(async () => {
        setLoader(true)
        let res: ILoadProcessResponse = await window.dragApi.getData();
        if (!res)
            res = await window.uploadFile.getData();
        setData(res.data);
        setFile(res.filename);
        setTookTime(res.timestamp - initialTimeStamp);
    }, []);
    useEffect(() => {
        fetchData().finally(() => setLoader(false));
        setTimeout(() => {
            setLoader(false), 1000
        })
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
            <AtModal isVisible={loader}/>
        </Fragment>
    );
}

export {OrDashboard}