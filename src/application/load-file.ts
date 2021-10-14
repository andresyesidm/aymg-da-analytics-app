import {PythonShell} from 'python-shell'
import * as path from "path";
import {ILoadProcessResponse} from "../domain/ILoadProcessResponse";

export class LoadFile {

    static showTable(filename: string, all: boolean): Promise<Record<string, any>> {
        console.log('Hers')
        if (all) {
            return this.callPyShelProxy(filename, 'python-scripts/load-file.py');
        }
        console.log('here')
        return this.callPyShelProxy(filename, 'python-scripts/load-file-random.py');
    }

    private static callPyShelProxy(filename: string, script: string) {
        return new Promise<ILoadProcessResponse>((resolve) => {
            try {
                const pyShell = new PythonShell(path.join(__dirname, script), {
                        args: [filename]
                    }
                )
                console.log('heeeeeeer')

                const options: any = {
                    mode: 'text',
                    pythonOptions: ['-u'], // get print results in real-time
                    args: [filename]
                };
                PythonShell.run(path.join(__dirname, script), options, function (err, results) {
                    if (err) throw err;
                    // results is an array consisting of messages collected during execution
                    console.log('results: %j', results);
                })
                pyShell.on('message', (data) => {
                    console.log('Heeer')
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
            } catch (e) {
                console.log('Error', e)
            }
        })
    }
}