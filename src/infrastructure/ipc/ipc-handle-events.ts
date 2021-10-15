import {dialog, ipcMain, BrowserWindow} from "electron";
import {LoadFile} from "../../application/load-file";
import {TTest} from "../../application/ttest";
import {Correlation} from "../../application/correlation";

const ipcHandleEvents = (mainWindow: BrowserWindow) => {
    ipcMain.on('ondrop', async (event, filePath, all) => {
        event.reply('ondrop-reply', await LoadFile.showTable(filePath, all));
    });

    ipcMain.on('onUpload', async (event, all) => {
        const files = await dialog.showOpenDialog(mainWindow, {
            title: 'Cargar archivo',
            buttonLabel: 'Cargar',
            filters: [{name: 'Archivos de datos', extensions: ['csv']}],
            properties: ['openFile']
        });
        if (!files.canceled)
            console.log(await LoadFile.showTable(files.filePaths[0], all))
            event.reply('onUploadReply', await LoadFile.showTable(files.filePaths[0], all));
    });

    ipcMain.on('on-ttest', async (event, filePath, sample, column) => {
        console.log('TTTTT')
        event.reply('on-ttest-reply', await TTest.ttestOneSample(filePath, sample, column));
    })

    ipcMain.on('on-t-test-ind', async (event, filePath, columnOne, columnTwo) => {
        event.reply('on-t-test-ind-reply', await TTest.tTestParing(filePath, columnOne, columnTwo));
    })

    ipcMain.on('on-correlation', async (event, filePath) => {
        event.reply('on-correlation-reply', await Correlation.correlationTest(filePath));
    })
}

export {ipcHandleEvents}