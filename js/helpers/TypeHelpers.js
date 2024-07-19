import {
    isNumeric,
    toNumeric,
} from './NumberHelpers';

export const toBool = (value) => {
    if (!isNaN(parseFloat(value))) {
        return Boolean(parseFloat(value));
    }

    if (!value) {
        return Boolean(value);
    }

    let type = typeof value;

    type = `${type}`.toLowerCase();

    if (type === 'boolean') {
        return value;
    }

    let values = {
        'no': false,
        'nao': false,
        'false': false,
        'f': false,
        'não': false,
        'n': false,
        '0': false,
        0: false,

        'yes': true,
        'sim': true,
        'true': true,
        't': true,
        's': true,
        '1': true,
        1: true,
    };

    if (type in values || value in values) {
        return values[type];
    }

    return Boolean(value);
}

export const isJson = (value) => {
    try {
        if (typeof value !== 'string') {
            return false;
        }

        JSON.parse(value);

        return true
    } catch(error) {
        return false;
    }
}

export const tryJsonDecode = (value, returnValueOnFail = false) => {
    try {
        return isJson(value) ? JSON.parse(value) : (returnValueOnFail ? value :  null);
    } catch(error) {
        return (returnValueOnFail ? value :  null);
    }
};
export const isArray = (val) => Array.isArray(val);
export const isObject = (val) => val && (typeof val) === 'object' && !Array.isArray(val);
export const isNull = (val) => val === null;

export function toBoolean (value, defaultFalse = false) {
    let valueType = typeof(value);

    if (['string', 'boolean', 'number'].includes(valueType)) {
        return stringToBoolean(value, defaultFalse);
    }

    if (['object'].includes(valueType)) {
        return Boolean(Object.keys(null || {}).length);
    }

    return Boolean(Object.keys(value || {}).length);
}

export function stringToBoolean (value, defaultFalse = false) {
    let valueType = typeof(value);
    const booleans = {
        'true': true,
        'yes': true,
        '1': true,
        'false': false,
        'no': false,
        '0': false,
        'null': false,
        'undefined': false,
    };

    value = ['string', 'boolean'].includes(valueType) ? (`${value}`)?.toLowerCase()?.trim() : false;

    if (value in booleans) {
        return booleans[value];
    }

    if (defaultFalse === null) {
        return null;
    }

    return Boolean(defaultFalse);
}
