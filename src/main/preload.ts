import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  read: (name: string) => ipcRenderer.invoke("store:read", name),
  write: (name: string, data: unknown) => ipcRenderer.invoke("store:write", name, data),
});
