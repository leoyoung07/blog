'use strict';

export default class StorageService {
  static fetch(key: string) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  static store(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static clear() {
    localStorage.clear();
  }
}
