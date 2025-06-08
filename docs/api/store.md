# `spaish.sessionStore`

Low-level API for sessionStorage operations with JSON serialization and safe error handling.

## `writeArray(sessionKey, array)`

Stores an array in sessionStorage as JSON.

### Parameters
- `sessionKey` (string) - The key to store the data under in sessionStorage
- `array` (Array) - The array to store

### Description
- Serializes the array using `JSON.stringify()`
- Stores the result in `sessionStorage` using the provided key
- Overwrites any existing data at that key

### Example
```javascript
spaish.sessionStore.writeArray('my-list', ['item1', 'item2', 'item3']);
// Stores: sessionStorage['my-list'] = '["item1","item2","item3"]'
```

### Error Handling
- No explicit error handling - relies on browser's sessionStorage behavior
- May throw if sessionStorage is unavailable or quota exceeded

## `readArray(sessionKey)`

Reads an array from sessionStorage with safe JSON parsing.

### Parameters
- `sessionKey` (string) - The key to read from sessionStorage

### Returns
- `Array` - The stored array, or empty array `[]` if not found or invalid

### Description
- Retrieves string value from `sessionStorage.getItem()`
- Attempts to parse as JSON using `_safeJsonParse()`
- Returns empty array if key doesn't exist or parsing fails
- Provides safe fallback for missing or corrupted data

### Example
```javascript
const items = spaish.sessionStore.readArray('my-list');
// Returns: ['item1', 'item2', 'item3'] or [] if not found
```

## `writeMap(sessionKey, map)`

Stores a Map object in sessionStorage as JSON.

### Parameters
- `sessionKey` (string) - The key to store the data under in sessionStorage
- `map` (Map) - The Map object to store

### Description
- Converts Map to array of entries using spread operator: `[...map]`
- Serializes the entries array using `JSON.stringify()`
- Stores the result in `sessionStorage`

### Example
```javascript
const myMap = new Map([['key1', 'value1'], ['key2', 'value2']]);
spaish.sessionStore.writeMap('my-map', myMap);
// Stores: sessionStorage['my-map'] = '[["key1","value1"],["key2","value2"]]'
```

## `readMap(sessionKey)`

Reads a Map object from sessionStorage with safe JSON parsing.

### Parameters
- `sessionKey` (string) - The key to read from sessionStorage

### Returns
- `Map` - The stored Map object, or empty Map if not found or invalid

### Description
- Retrieves string value from `sessionStorage.getItem()`
- Attempts to parse as JSON using `_safeJsonParse()`
- Creates new Map from parsed entries array
- Returns empty Map if key doesn't exist or parsing fails

### Example
```javascript
const myMap = spaish.sessionStore.readMap('my-map');
// Returns: Map with entries or new Map() if not found
console.log(myMap.get('key1')); // 'value1'
```

## `writeString(sessionKey, value)`

Stores a string value directly in sessionStorage.

### Parameters
- `sessionKey` (string) - The key to store the data under in sessionStorage
- `value` (string) - The string value to store

### Description
- Stores the string value directly using `sessionStorage.setItem()`
- No JSON serialization needed for plain strings
- Overwrites any existing data at that key

### Example
```javascript
spaish.sessionStore.writeString('theme', 'dark');
// Stores: sessionStorage['theme'] = 'dark'
```

## `readString(sessionKey)`

Reads a string value from sessionStorage.

### Parameters
- `sessionKey` (string) - The key to read from sessionStorage

### Returns
- `string` - The stored string, or empty string `''` if not found

### Description
- Retrieves value directly using `sessionStorage.getItem()`
- Returns empty string if key doesn't exist (when `getItem()` returns `null`)
- No JSON parsing needed for plain strings

### Example
```javascript
const theme = spaish.sessionStore.readString('theme');
// Returns: 'dark' or '' if not found
```

## `_safeJsonParse(value)` (Internal)

Internal utility function for safe JSON parsing.

### Parameters
- `value` (string) - The JSON string to parse

### Returns
- `any` - The parsed object, or `null` if parsing fails

### Description
- Attempts to parse JSON using `JSON.parse()`
- Uses try/catch to handle malformed JSON gracefully
- Returns `null` on any parsing error
- Used internally by `readArray()` and `readMap()`

### Example
```javascript
// Internal usage only
const result = spaish.sessionStore._safeJsonParse('{"key": "value"}');
// Returns: {key: "value"} or null if invalid
```

## Storage Patterns

### Key Naming Convention
SPAish uses consistent key naming patterns:
- `${pageKey}---scroll-restore` for scroll positions
- `${pageKey}---dialog-reopen` for details state  
- `spaish-color-scheme` for theme preference

### Error Resilience
All read operations provide safe fallbacks:
- Arrays default to `[]`
- Maps default to `new Map()`
- Strings default to `''`
- JSON parsing errors are caught and handled

### Browser Support
- Requires `sessionStorage` API support
- Uses native JSON methods for serialization
- Compatible with modern browsers that support Map objects