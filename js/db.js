const DB_NAME = 'TruckFuelDB';
const DB_VERSION = 1;
let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onupgradeneeded = e => {
      db = e.target.result;
      if (!db.objectStoreNames.contains('veiculos')) {
        db.createObjectStore('veiculos', { keyPath: 'placa' });
      }
      if (!db.objectStoreNames.contains('abastecimentos')) {
        db.createObjectStore('abastecimentos', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('viagens')) {
        db.createObjectStore('viagens', { keyPath: 'id', autoIncrement: true });
      }
    };
    req.onsuccess = e => { db = e.target.result; resolve(db); };
    req.onerror = e => reject(e.target.error);
  });
}

function tx(storeName, mode = 'readonly') {
  return db.transaction(storeName, mode).objectStore(storeName);
}

export function addRecord(storeName, data) {
  return new Promise((res, rej) => {
    const store = tx(storeName, 'readwrite');
    const req = store.add(data);
    req.onsuccess = () => res(req.result);
    req.onerror = e => rej(e.target.error);
  });
}

export function getAll(storeName) {
  return new Promise((res, rej) => {
    const store = tx(storeName);
    const req = store.getAll();
    req.onsuccess = () => res(req.result);
    req.onerror = e => rej(e.target.error);
  });
}
