// addScrollbar
const scrollbar = (component, props = {}) => {
    if (window.innerWidth > 768) {
        window.utils.waitFor(() => {
            return window.SimpleBar
        }, () => {
            return new SimpleBar(component instanceof HTMLElement ? component : document.querySelector(component), Object.assign({
                autoHide: false
            }, props));
        });
    }
}

export default scrollbar
