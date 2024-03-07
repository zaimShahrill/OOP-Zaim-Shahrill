// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    fetchCountryData: () => ipcRenderer.send('fetchCountryData'),
    receiveCountryData: (callback) => {
        ipcRenderer.on('countryData', (event, countryData) => callback(countryData));
    }
});

// Retrieve country data when the page loads
document.addEventListener('DOMContentLoaded', () => {
    electronAPI.fetchCountryData();
});
