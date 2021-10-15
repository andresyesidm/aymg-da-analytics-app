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
    execute: (filename: string, sample: number, column: string) => void,
    result: () => Promise<ILoadProcessResponse>
}

export interface ITTestInd {
    execute: (filename: string, columnOne:string, columnTwo: string) => void,
    result: () => Promise<ILoadProcessResponse>
}

export interface ICorrelation {
    execute: (filename: string) => void,
    result: () => Promise<ILoadProcessResponse>
}

declare global {
    interface Window {
        dragApi: IDrag,
        uploadFile: IUpload,
        ttest: ITTest,
        ttestInd: ITTestInd,
        correlation: ICorrelation
    }
}