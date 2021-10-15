import {PythonShell} from 'python-shell'
import * as path from "path";
import {ILoadProcessResponse} from "../domain/ILoadProcessResponse";

export class Correlation {

    static correlationTest(filename: string): Promise<ILoadProcessResponse> {
        return new Promise<ILoadProcessResponse>((resolve) => {
            const pyShell = new PythonShell(path.join(__dirname, 'python-scripts/correlation.py'), {
                    args: [filename]
                }
            )
            console.log('Correlation')
            pyShell.on('message', (data: any,err: any) => {
                console.log('Correlation', data)
                pyShell.end((err) => {
                    if (err)
                        console.log('Err', err)
                    console.log('Successful python shell to load data');
                })
                data = data.toString();
                const response = {
                    data: JSON.parse(data),
                    filename,
                    timestamp: new Date().getTime()
                }
                resolve(response);
            })
        })
    }
}