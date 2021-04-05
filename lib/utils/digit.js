export function addDigit(value) {
    return value.toString().replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, "$1 ").trim()
}

export function removeDigit(str) {
    return str.toString().replace(/ +/g, '').trim()
}