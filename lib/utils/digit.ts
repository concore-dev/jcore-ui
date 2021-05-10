const digit = {
    add: function (value: number) {
        return value.toString().replace(/(\d{1,3})(?=((\d{3})*([^\d]|$)))/g, "$1 ").trim()
    },
    remove: function (value: string) {
        return value.toString().replace(/ +/g, '').trim()
    }
}

export default digit