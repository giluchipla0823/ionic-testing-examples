import { StorageAdapter } from './storage-adapter.interface';
import { Injectable } from '@angular/core';
import { Storage, Drivers, StorageConfig } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

export type ApiCacheResponse<T> = {
  createdAt?: number | null;
  expiredAt?: number | null;
  data: T;
};

// Expire time in seconds (1 hour)
const TTL = 60 * 60;

// Prefix Key to identify only cached API data
const PREFIX_CACHE_KEY = '_api_cached_';

const STORAGE_CONFIG: StorageConfig = {
  name: '_ionic_storage_api',
  driverOrder: [
    CordovaSQLiteDriver._driver,
    Drivers.IndexedDB,
    Drivers.LocalStorage,
  ],
};

@Injectable({
  providedIn: 'root',
})
export class StorageApiService implements StorageAdapter {
  private storage: Storage;

  constructor() {
    this.storage = new Storage(STORAGE_CONFIG);
  }

  // Setup Ionic Storage
  async init(): Promise<void> {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }

  // Get the value from storage of a given key.
  async get<T>(key: string): Promise<ApiCacheResponse<T> | null> {
    key = `${PREFIX_CACHE_KEY}${key}`;

    const storedValue = await this.storage.get(key);

    if (!storedValue) {
      return null;
    }

    const currentTime = new Date().getTime();

    const { expiredAt } = storedValue;

    if (expiredAt < currentTime) {
      await this.storage.remove(key);

      return null;
    }

    return storedValue;
  }

  // Set the value in storage for a given key.
  set<T>(key: string, value: T): Promise<any> {
    const createdAt = new Date().getTime();
    const expiredAt = createdAt + TTL * 1000;

    key = `${PREFIX_CACHE_KEY}${key}`;

    return this.storage.set(key, { createdAt, expiredAt, data: value });
  }

  // Clear keys and values from storage.
  async clear(): Promise<void> {
    const keys = await this.storage.keys();

    keys.map(async (key) => {
      if (key.startsWith(PREFIX_CACHE_KEY)) {
        await this.storage.remove(key);
      }
    });
  }

  // Remove the value from storage for a given key, if any.
  async remove(key: string): Promise<void> {
    await this.storage.remove(`${PREFIX_CACHE_KEY}${key}`);
  }
}
