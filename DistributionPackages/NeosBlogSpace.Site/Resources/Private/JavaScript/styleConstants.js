const upperFirst = require('lodash.upperfirst');

const config = {
    spacing: {
        goldenUnit: '40px',
        full: '16px',
        half: '8px',
        quarter: '4px'
    },
    transition: {
        fast: '.1s',
        default: '.25s',
        slow: '.5s'
    },
    fontSize: {
        large: '36px',
        base: '14px',
        small: '12px'
    },
    fonts: {
        headings: {
            family: 'Roboto',
            style: 'Light',
            cssWeight: '300'
        },
        base: {
            family: 'Open Sans',
            cssWeight: '400'
        }
    },
    colors: {
        primaryBlue: '#00ADEE',
        primaryBlueHover: '#35c3f8',
        white: '#FFF',
        primaryGray: 'rgb(50,50,50)',
        success: '#00a338',
        successHover: '#0bb344',
        warn: '#ff8700',
        warnHover: '#fda23d',
        error: '#ff460d',
        errorHover: '#ff6a3c',
    }
};

const generateCssVarsObject = (subject = config, predicate = '') => {
    const hasPredicate = predicate && predicate.length;
    let target = {};

    Object.keys(subject).forEach(key => {
        const val = subject[key];
        const camelKey = upperFirst(key);
        const nestedPredicate = hasPredicate ? predicate + camelKey : key;

        if (Array.isArray(val)) {
            val.forEach((item, index) => {
                target[`--${predicate}-${camelKey}-${upperFirst(item)}`] = `${index + 1}`;
            });
        } else if (typeof val === 'object') {
            target = Object.assign({}, target, generateCssVarsObject(val, nestedPredicate));
        } else {
            target[`--${predicate}-${camelKey}`] = val;
        }
    });

    return target;
};

const styles = generateCssVarsObject(config);

module.exports = {
    styles
};