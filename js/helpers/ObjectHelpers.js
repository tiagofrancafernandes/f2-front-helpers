import {
    filled
} from './DataHelpers.js';

/**
 * Usage:
 * `objectFilter({...}, item => item)`
 */
export const objectFilter = function(object, filter = null) {
    filter = typeof filter === 'function' ? filter : (value, key) => filled(value);
    object = object && (typeof object === 'object') ? object : {};

    return Object.fromEntries(Object.entries(object).filter(item => {
        let [key, value] = item;
        return filter(value, key);
    }));
}

/**
 * Usage:
 * `objectMap({a: { value: 123, }}, (item, key) => { return { valor: item.value}; })`
 * `objectMap({a: { value: 123, }}, (item, key) => { return { ...item, valor: item.value, key}; })`
 */
export const objectMap = function(object, mapFn) {
    mapFn = mapFn && typeof mapFn === 'function' ? mapFn : (value, key) => value;

    return Object.fromEntries(Object.entries(object).map(item => {
        let [key, value] = item;
        value = mapFn(value, key);
        return [key, value];
    }));
}
