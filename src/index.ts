import {app, BrowserWindow, Menu, nativeTheme, Tray, nativeImage} from 'electron';
import {ipcHandleEvents} from "./infrastructure/ipc/ipc-handle-events";
import * as path from "path";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: any;

if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
    app.quit();
}
let mainWindow: BrowserWindow;
const createWindow = (): void => {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 600,
        minWidth: 600,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
        }
    });

    mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY).then();
    nativeTheme.themeSource = 'dark'

    // Open the DevTools.
    //mainWindow.webContents.openDevTools();
    Menu.setApplicationMenu(null);

};

let tray: Tray = null

app.whenReady().then(() => {
    createWindow();
    ipcHandleEvents(mainWindow);
    tray = new Tray(path.join(__dirname, 'assets/img/Logo.png'))
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Mostrar App', click: () => {
                if (BrowserWindow.getAllWindows().length === 0) {
                    createWindow()
                } else {
                    mainWindow.show();
                }
            }
        },
        {
            label: 'Cerrar', click: () => {
                if (process.platform !== 'darwin') {
                    tray.destroy();
                    app.quit()
                }
            }
        }
    ])
    tray.setToolTip('Analisís de Datos.')
    tray.setContextMenu(contextMenu)

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

    app.on('window-all-closed', ($event: any) => {
        if (process.platform !== 'darwin') {
                $event.preventDefault();
        }
    })


})



