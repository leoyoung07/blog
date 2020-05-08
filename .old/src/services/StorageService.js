'use strict';

export default class StorageService {
  static fetch (key) {
    const value = localStorage.getItem(key);
    return JSON.parse(value);
  }

  static store (key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static remove (key) {
    localStorage.removeItem(key);
  }

  static clear () {
    localStorage.clear();
  }
}
