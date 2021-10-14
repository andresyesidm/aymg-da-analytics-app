import {ILoadProcessResponse} from "./domain/ILoadProcessResponse";

export interface IDrag {
    loadDropFile: (filename: string, all?: boolean) => void,
    getData: () => Promise<ILoadProcessResponse>
}

export interface IUpload {
    loadFile: (all?: boolean) => void,
    getData: () => Promise<ILoadProcessResponse>
}

export interface ITTest {
    execute: (filename: string, sample: number) => void,
    result: () => Promise<ILoadProcessResponse>
}

declare global {
    interface Window {
        dragApi: IDrag,
        uploadFile: IUpload,
        ttest: ITTest
    }
}