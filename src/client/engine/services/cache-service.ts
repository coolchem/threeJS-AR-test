
let storage = require("store2");

/***
 * This function is used to store Data to corresponding key in browsers local storage,
 * more info at https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
 *
 * @param key
 * @param value
 * @param cacheNamespace if provided, namespace in the cache is used (created if not available) to store the key and value.
 */
export function store(key:string, value:any, cacheNamespace?:string):void {

    let store = storage;

    if (cacheNamespace) {

         store = storage.namespace(cacheNamespace);
    }

    if (store)
        store(key, value);
}

/**
 * This function is used to store Data to corresponding key in browsers session storage
 *
 * all data stored in the session storage is removed when the browser or the browser tab is closed
 *
 * Session storage survives browser refresh.
 *
 * More info at https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage
 *
 * @param key
 * @param value
 * @param cacheNamespace
 */
export function storeSession(key:string, value:any, cacheNamespace?:string):void {

    let store:Function = storage.session;

    if (cacheNamespace) {
        store = storage.session.namespace(cacheNamespace);
    }

    if (store)
        store(key, value);
}

/**
 * Removes a key and its corresponding value from browsers local storage.
 *
 * @param key
 * @param cacheNamespace if Provided, if namespace is found in the cache, the key and its corresponding value is removed
 */
export function remove(key:string, cacheNamespace?:string):void {

    let store = storage;

    if (cacheNamespace) {

        store = storage.namespace(cacheNamespace);
    }

    if (store)
        store.remove(key);
}

/**
 * Removes a key and its corresponding value from browsers session storage.
 *
 * @param key
 * @param cacheNamespace if Provided, if namespace is found in the cache, the key and its corresponding value is removed
 */
export function removeSession(key:string, cacheNamespace?:string):void {

    let store = storage.session;

    if (cacheNamespace) {
        store = storage.session.namespace(cacheNamespace);
    }

    if (store)
        store.remove(key);
}

/**
 * Retrieves value corresponding to the provided key from browsers local storage
 *
 * @param key
 * @param cacheNamespace if Provided, if namespace is found in the cache, data is retrieved from that namespace.
 */
export function getFromStore(key:string, cacheNamespace?:string):any {

    let store = storage;

    if (cacheNamespace) {
        store = storage.namespace(cacheNamespace);
    }

    if (store)
        return store(key);
}

/**
 * Retrieves value corresponding to the provided key from browsers session storage
 *
 * @param key
 * @param cacheNamespace if Provided, if namespace is found in the cache, data is retrieved from that namespace.
 */
export function getFromSession(key:string, cacheNamespace?:string):any {

    let store:Function = storage.session;

    if (cacheNamespace) {

        store = storage.session.namespace(cacheNamespace);
    }

    if (store)
        return store(key);
}