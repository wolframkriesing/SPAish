const spaish = {
  _store: {
    _safeJsonParse: (value) => {
      try {
        return JSON.parse(value);
      } catch {
        return null;
      }
    },
    writeArray: (sessionKey, array) => {
      const items = JSON.stringify(array);
      sessionStorage.setItem(sessionKey, items);
    },
    readArray: (sessionKey) => {
      const values = sessionStorage.getItem(sessionKey);
      const fromStorage = spaish._store._safeJsonParse(values);
      return fromStorage === null ? [] : fromStorage;
    },
    /**
     * @param sessionKey {string}
     * @return {Map[string, any]}
     */
    readMap: (sessionKey) => {
      const values = sessionStorage.getItem(sessionKey);
      const fromStorage = spaish._store._safeJsonParse(values);
      return fromStorage === null ? new Map() : new Map(fromStorage);
    },

    /**
     * Write a Map to sessionStorage.
     * @param sessionKey {string}
     * @param map {Map[string, any]}
     */
    writeMap: (sessionKey, map) => {
      const items = JSON.stringify([...map]);
      sessionStorage.setItem(sessionKey, items);
    },
  },
};
