export function createInputObj(placeholder, type = 'text', elementType = 'input') {
    return {
        elementType,
        elementConfig: {
            type,
            placeholder
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
    }
};

export function createSelectObj(args) {
    const options = [...args].map(option => ({
        value: option.value,
        displayName: option.displayName
    }));
    return {
        elementType: 'select',
        elementConfig: {
            options
        },
        value: options[0].value
    }
};

export function checkValidity(value, rules) {
    let isValid = true;

    if (rules.required) {
        isValid = Boolean(value.trim()) && isValid; 
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
}