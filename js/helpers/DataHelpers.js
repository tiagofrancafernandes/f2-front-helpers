export const filled = (value) => {
    let valueType = typeof value;

    if (valueType === 'object') {
        return Boolean(Object.keys(value || {}).length);
    }

    if (valueType === 'string') {
        return Boolean(value.trim().length);
    }

    if (valueType === 'number') {
        return isNaN(value - 0) ? false : true;
    }

    if (valueType === 'undefined' || value === undefined || value === null || isNaN(value)) {
        return false;
    }

    return true;
}

export const count = (value) => {
    let valueType = typeof value;

    try {
        if (valueType === 'object') {
            return Object.keys(value || {}).length;
        }

        if (valueType === 'string') {
            return String(value).length;
        }

        return Object.keys(value || {}).length;
    } catch (error) {
        console.error(error);
        return 0;
    }
}
