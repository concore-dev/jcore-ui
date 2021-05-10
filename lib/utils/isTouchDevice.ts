function isTouchDevice() {
    return window.ontouchstart !== undefined;
}

export default isTouchDevice