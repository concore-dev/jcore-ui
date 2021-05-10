import { IFunction } from '../interfaces/index';

const loadImg = (img: HTMLImageElement | string, resolve: IFunction, reject: IFunction = () => {}) => {
    const image = new Image();
    let src: string;

    if (img instanceof HTMLImageElement) {
        src = img.getAttribute('src');
    } else if (img.constructor.name === 'string') {
        src = img;
    }

    image.onload = function(){
        resolve()
    }

    image.onerror = function(){
        reject()
    }

    image.src = src;
}

export default loadImg