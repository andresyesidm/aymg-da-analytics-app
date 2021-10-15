import {PythonShell} from 'python-shell'
import * as path from "path";
import {ILoadProcessResponse} from "../domain/ILoadProcessResponse";

export class TTest {

    static ttestOneSample(filename: string, sample: number, column: string): Promise<ILoadProcessResponse> {
        return new Promise<ILoadProcessResponse>((resolve) => {
            const pyShell = new PythonShell(path.join(__dirname, 'python-scripts/ttest.py'), {
                    args: [filename, String(sample), column]
                }
            )
            pyShell.on('message', (data: any,err: any) => {
                console.log('Data', data)
                console.log('Data', err)
                pyShell.end((err) => {
                    if (err)
                        console.log('Err', err)
                    console.log('Successful python shell to load data');
                })
                const response = {
                    data: data,
                    filename,
                    timestamp: new Date().getTime()
                }
                resolve(response);
            })
        })
    }

    static tTestParing(filename: string, columnOne: string, columnTwo: string): Promise<ILoadProcessResponse> {
        return new Promise<ILoadProcessResponse>((resolve) => {
            const pyShell = new PythonShell(path.join(__dirname, 'python-scripts/ttest-ind.py'), {
                    args: [filename, columnOne, columnTwo]
                }
            )
            pyShell.on('message', (data: any,err: any) => {
                console.log('Data', data)
                pyShell.end((err) => {
                    if (err)
                        console.log('Err', err)
                    console.log('Successful python shell to load data');
                })
                const response = {
                    data: data,
                    filename,
                    timestamp: new Date().getTime()
                }
                resolve(response);
            })
        })
    }
}