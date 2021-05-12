import canusewebp from './canusewebp';

const lazyLoad = function(element: HTMLElement | NodeListOf<HTMLElement> | string) {
    let images;

    if (typeof element === "string") {
        images = document.querySelectorAll<HTMLElement>('[data-lazy]');
    } else if (element instanceof HTMLElement) {
        images = [element];
    } else if (element instanceof NodeList) {
        images = element;
    }

    images.forEach(function(item: HTMLElement) {
        let format: string;

        if (item.hasAttribute('data-format')) {
            format = canusewebp() ? '.webp' : '.jpg';
        }

        lazy(item, format);

        window.addEventListener('scroll', function() {
            lazy(item, format);
        });
    });
}

export default lazyLoad

export function lazy(item:HTMLElement, format:string = null) {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
        windowScroll = document.documentElement.scrollTop || document.body.scrollTop,
        elemRect = windowScroll + item.getBoundingClientRect().top,
        windowCordStart = windowScroll,
        windowCordEnd = windowHeight + windowScroll,
        elemCordStart = windowScroll + item.getBoundingClientRect().top,
        elemCordEnd = elemRect + item.clientHeight;

    if (elemCordStart - 300 <= windowCordEnd && windowCordStart <= elemCordEnd + 300 && item.getAttribute('data-lazy') !== 'loaded') {

        if (item.localName == 'img') {
            if (item.parentElement.localName != 'picture') {
                if (format) {
                    item.setAttribute('src', item.dataset.lazy + format);
                } else {
                    item.setAttribute('src', item.dataset.lazy);
                }

                item.setAttribute('data-lazy', 'loaded')

                return false;
            }

            let source = item.parentNode.querySelectorAll('source');

            source.forEach( function(elem) {
                // if (format) {
                //     elem.setAttribute('srcset', elem.dataset.lazy + format);
                // } else {
                //     elem.setAttribute('srcset', elem.dataset.lazy);
                // }
                elem.setAttribute('srcset', elem.dataset.lazy);

                item.setAttribute('lazy-load', 'loaded')
            });
        } else {
            item.style.backgroundImage = `url(${item.dataset.lazy})`;
        }
    }
}
