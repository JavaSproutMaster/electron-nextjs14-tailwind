import { app, ipcMain } from 'electron';
import serve from 'electron-serve';
import { createWindow } from './helpers';

const isProd: boolean = process.env.NODE_ENV === 'production';

if (isProd) {
  serve({ directory: 'app' });
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`);
}

(async () => {
  await app.whenReady();

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600,
  });

  if (isProd) {
    await mainWindow.loadURL('app://./page.html');
  } else {
    const port = process.argv[2];
    await mainWindow.loadURL(`http://localhost:${port}/page`);
    mainWindow.webContents.openDevTools();
  }
})();

app.on('window-all-closed', () => {
  app.quit();
});

ipcMain.on('login', async (event, email, password) => {
  // login 

});

ipcMain.on('logout', async (event) => {
  // logout 
  
});

ipcMain.on('signup', async (event, username, email, password) => {
  // signup 
  
});

ipcMain.on('usertask', async (event, email, password) => {
  // usertask 
  
});

ipcMain.on('signup', async (event, email, password) => {
  // signup 
  
});