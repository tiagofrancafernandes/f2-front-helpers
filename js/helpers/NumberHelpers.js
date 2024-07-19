export const isNumeric = (val) => !isNaN(val -0);
export const toNumeric = (val, defaultValue = null) => isNumeric(val) ? (val -0) : toNumeric(defaultValue, null);

export const toIntOr = (value, defaultValue = null) => {
    value = parseInt(value);
    defaultValue = defaultValue !== null && !isNaN(parseInt(defaultValue)) ? parseInt(defaultValue) : null;

    return !isNaN(value) ? value : defaultValue;
}

export const toPositiveIntOr = (value, defaultValue = 0) => {
    defaultValue = toIntOr(defaultValue, 0);
    value = toIntOr(value, defaultValue) || defaultValue;

    return value > 0 ? value : (value - (value * 2));
}

export const positiveIntOr = (value, defaultValue = 0) => {
    return toPositiveIntOr(value, defaultValue);
}

export const msTimeFromExpression = (value) => {
    if ((typeof value === 'number') && !isNaN(parseInt(value))) {
        return parseInt(value);
    }

    if (typeof value !== 'string') {
        return null;
    }

    let isNegative = value.startsWith('-') || value < 0;

    value = isNegative ? value.slice(1) : value;

    let result = value.match(/^([0-9]){1,}(ms|s|m|h){1}$/g);

    if (!result) {
        result = !isNaN(parseInt(value)) ? parseInt(value) : null;
        return isNegative ? result - (result * 2) : result;
    }

    value = (result ?? [null])[0] ?? null;

    let num = parseInt(value.slice(0, value.search(/(.?)(ms|s|m|h){1}$/g) + 1));
    let timeXpr = value.slice(value.search(/(.?)(ms|s|m|h){1}$/g) + 1);

    if (isNaN(num)) {
        return null;
    }

    const getValueFor = (time, xpr) => {
        switch (xpr) {
        case 's':
            return time * 1000;
            break;

        case 'm':
            return (time * 1000) * 60;
            break;

        case 'h':
            return (time * 1000) * (60 * 60);
            break;

        case 'ms':
        default:
            return time;
        }
    };

    result = getValueFor(num, timeXpr);
    return isNegative ? result - (result * 2) : result;
}

export const positiveMsTimeFromExpression = (value) => {
    let result = toIntOr(msTimeFromExpression(value), 0);
    return toPositiveIntOr(result, (result - (result * 2)));
}
