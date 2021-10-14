import {dialog, ipcMain, BrowserWindow} from "electron";
import {LoadFile} from "../../application/load-file";
import {TTest} from "../../application/ttest";

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
            event.reply('onUploadReply', await LoadFile.showTable(files.filePaths[0], all));
    });

    /*ipcMain.on('on-ttest', async (event, filePath, sample) => {
        event.reply('on-ttest-reply', await TTest.ttestOneSample(filePath, sample));
    })*/
}

export {ipcHandleEvents}