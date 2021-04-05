const object = {
    // extend(source, properties) {
    //     var property;
    //     for (property in properties) {
    //         if (properties.hasOwnProperty(property)) {
    //             source[property] = properties[property];
    //         }
    //     }
    //     return source;
    // },
    is(o) {
        return typeof o === 'object' && o !== null && o.constructor && o.constructor === Object;
    },
    /**
     * Object.assign
     * @param  {...any} args 
     */
    extend(...args) {
        const to = Object(args[0]);
        for (let i = 1; i < args.length; i += 1) {
            const nextSource = args[i];
            if (nextSource !== undefined && nextSource !== null) {
                const keysArray = Object.keys(Object(nextSource));
                for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
                    const nextKey = keysArray[nextIndex];
                    const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                    if (desc !== undefined && desc.enumerable) {
                        if (object.is(to[nextKey]) && object.is(nextSource[nextKey])) {
                            object.extend(to[nextKey], nextSource[nextKey]);
                        } else if (!object.is(to[nextKey]) && object.is(nextSource[nextKey])) {
                            to[nextKey] = {};
                            object.extend(to[nextKey], nextSource[nextKey]);
                        } else {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
        }
        return to;
    }
}

export default object