import canusewebp from './canusewebp.js';

const lazyLoad = () => {
    const images = document.querySelectorAll('[lazy-load]');

    images.forEach(function(item) {
        let format = false;

        if (item.getAttribute('lazy-load') === 'format') {
            format = canusewebp() ? '.webp' : '.jpg';
        }

        lazy(item, format);
        window.addEventListener('scroll', function() {
            lazy(item, format);
        });
    });
}
export default lazyLoad

/**
 * Устанавливает src для img или source из data-lazy, если элемент в области видимости
 * @param {HTMLImageElement} item img элемент
 * @param {String} format расширение картинки
 */
export function lazy(item, format = false) {
    let windowHeight = document.documentElement.clientHeight || document.body.clientHeight,
        windowScroll = document.documentElement.scrollTop || document.body.scrollTop,
        elemRect = windowScroll + item.getBoundingClientRect().top,
        windowCordStart = windowScroll,
        windowCordEnd = windowHeight + windowScroll,
        elemCordStart = windowScroll + item.getBoundingClientRect().top,
        elemCordEnd = elemRect + item.clientHeight;

    if (elemCordStart - 300 <= windowCordEnd && windowCordStart <= elemCordEnd + 300 && item.getAttribute('lazy-load') !== 'loaded') {

        if (item.localName == 'img') {
            if (item.parentNode.localName != 'picture') {
                if (format) {
                    item.setAttribute('src', item.dataset.lazy + format);
                } else {
                    item.setAttribute('src', item.dataset.lazy);
                }

                item.setAttribute('lazy-load', 'loaded')

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
