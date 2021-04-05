const loadImg = (img, resolve, reject) => {
    const image = new Image()

    image.onload = function(){
        resolve()
    }

    image.onerror = function(){
        reject()
    }

    image.src = img.constructor.name === 'HTMLImageElement' ? img.getAttribute('src') :
                img.constructor.name === 'String' ? img : '';
}

export default loadImg