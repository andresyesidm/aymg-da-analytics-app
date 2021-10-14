import {contextBridge, ipcRenderer} from 'electron';
import {ILoadProcessResponse} from "./domain/ILoadProcessResponse";

contextBridge.exposeInMainWorld('dragApi', {
    loadDropFile: (fileName: string, all = false) => {
        ipcRenderer.send('ondrop', fileName, all);
    },
    getData: () => {
        return new Promise<ILoadProcessResponse>((resolve) => {
            ipcRenderer.on('ondrop-reply', (event, replyData) => {
                resolve(replyData);
            })
        })
    }
})

contextBridge.exposeInMainWorld('uploadFile', {
    loadFile: (all = false) => {
        ipcRenderer.send('onUpload', all);
    },
    getData: () => {
        return new Promise<ILoadProcessResponse>((resolve) => {
            ipcRenderer.on('onUploadReply', (event, replyData) => {
                resolve(replyData);
            })
        })
    }
})
/*
contextBridge.exposeInMainWorld('ttest', {
    execute: (filename: string, sample: number) => {
        ipcRenderer.send('on-ttest', filename, sample);
    },
    result: () => {
        return new Promise<ILoadProcessResponse>((resolve) => {
            ipcRenderer.on('on-ttest-reply', (event, replyData) => {
                resolve(replyData);
            })
        })
    }
})*/