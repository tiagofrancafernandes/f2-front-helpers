import {
    isJson,
    tryJsonDecode,
    isArray,
    isNull,
    isNumeric,
    isObject,
    toNumeric,
    toBoolean,
    stringToBoolean,
} from './TypeHelpers.js';

export function parseTypeFromValue(value, mapTypes = null) {
    let valueType = typeof(value);

    mapTypes = { // 'undefined' | 'empty' | 'null' | 'NaN'
        undefined: null,
        ...(isObject(mapTypes) ? mapTypes : {}),
    };

    switch(valueType) {
      case 'undefined':
        return mapTypes['undefined'] ?? null;
        break;

      case 'string':
        if (value.toLowerCase() === 'null') {
            return mapTypes['null'] ?? null;
        }

        if (value === '') {
            return mapTypes['empty'] ?? null;
        }

        if (isNumeric(value)) {
            return toNumeric(value);
        }

        if (stringToBoolean(value, null) !== null) {
            return stringToBoolean(value);
        }

        return tryJsonDecode(value, true);
        break;

      case 'number':
        if (isNaN(value)) {
            return mapTypes['NaN'] ?? null;
        }

        return toNumeric(value);
        break;

      case 'object':
            if (isNull(value)) {
                return mapTypes['null'] ?? null;
            }

            return value;
        break;

      case 'boolean':
        return toBoolean(value);
        break;

      default:
        console.log(`type ${valueType} not mapped`)
        return mapTypes[valueType] ?? value;
    }

    return value;
}

export function parseQueryString(queryString, parseType = false) {
    const params = new URLSearchParams(queryString);
    const result = {};

    for (const [key, value] of params.entries()) {
        const keys = key.match(/[^[\]]+/g);  // Matches all parts of the key
        let current = result;

        keys.forEach((k, i) => {
            if (i === keys.length - 1) {
                current[k] = parseType ? parseTypeFromValue(value) : value;
            } else {
                current[k] = current[k] || {};
                current = current[k];
            }
        });
    }

    return result;
}
