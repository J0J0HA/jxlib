// Regular expressions for input validation by type
export const typePatterns: Record<string, RegExp> = {
    text: /^.*$/,
    password: /^.*$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    tel: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    checkbox: /^(on|off)$/,
    color: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
    number: /^-?\d+(?:\.\d+)?$/,
    time: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
    url: /^https?:\/\/.+\..+/,
    date: /^\d{4}-\d{2}-\d{2}$/,
};

// Regular expressions for input validation by inputmode
export const inputmodePatterns: Record<string, RegExp> = {
    text: /^.*$/,
    none: /^.*$/,
    tel: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
    url: /^https?:\/\/.+\..+/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    numeric: /^-?\d+$/,
    decimal: /^-?\d+(?:\.\d+)?$/,
};