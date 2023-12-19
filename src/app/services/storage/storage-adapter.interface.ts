export interface StorageAdapter {
  init?(): Promise<void>;
  set<T>(key: string, value: T): Promise<any>;
  get(key: string): Promise<any>;
  clear(): Promise<void>;
  remove(key: string): Promise<void>;
}
