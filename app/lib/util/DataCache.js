/*global*/
/**
 *
 * @flow
 */

// probably better as an immutable map... this will do for now
const GLOBAL_CONST_KEY = '__initialData__';

class DataCache {
  static _store = new Map();

  static get(key: string): ?Object {
    if (DataCache._store.has(key)) {
      return DataCache._store.get(key);
    }
    return null;
  }

  static set(key: string, value: Object) {
    DataCache._store.set(key, value);
  }

  static hydrateFromWindowGlobals() {
    const initialData = window && window[GLOBAL_CONST_KEY] || {};
    if (initialData) {
      Object.keys(initialData).forEach(key =>
        DataCache.set(key, initialData[key]));
    }
  }
}

module.exports = DataCache;
