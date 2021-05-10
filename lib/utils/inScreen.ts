import { IFunction } from "../interfaces";

function inScreen(element: Element, callback: IFunction) {
    let init = false;

    function check() {
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
        windowScroll = document.documentElement.scrollTop || document.body.scrollTop,
        elemRect = windowScroll + element.getBoundingClientRect().top,
        windowCordStart = windowScroll,
        windowCordEnd = windowHeight + windowScroll,
        elemCordStart = windowScroll + element.getBoundingClientRect().top,
        elemCordEnd = elemRect + element.clientHeight;

        if (elemCordStart - 300 <= windowCordEnd && windowCordStart <= elemCordEnd + 300 && init !== true) {
            init = true;
            callback()
        }
    }

    check()
    window.addEventListener('scroll', () => check())
}

export default inScreen

// inScreen(mapElement, map.init.bind(map))