const element = {
    coord(element: Element) {
        return {
            height: element.getBoundingClientRect().bottom - element.getBoundingClientRect().top,
            width: element.getBoundingClientRect().right - element.getBoundingClientRect().left,
            scrollHeight: element.scrollHeight,
            top: element.getBoundingClientRect().top,
            bottom: element.getBoundingClientRect().bottom,
            left: element.getBoundingClientRect().left,
            right: element.getBoundingClientRect().right,
            clientHeight: document.documentElement.clientHeight,
            clientWidth: document.documentElement.clientWidth,
        }
    },
    create(content: string) {
        const template = document.createElement('template');
        template.insertAdjacentHTML('afterbegin', content);
        return template.lastElementChild
    }
    // create(tag: string, attributes: IObject, children: Array<Element>, text: string, ns:string = null) {
    //     attributes = attributes || null;
    //     children = children || null;
    //     text = text || null;
    //     let element: Element;

    //     if (ns) {
    //         element = document.createElementNS(ns, tag);
    //     } else {
    //         element = document.createElement(tag);
    //     }

    //     if (children !== null) {
    //         children.forEach = [].forEach;
    //         children.forEach(child => {
    //             if (child !== null) {
    //                 element.appendChild(child);
    //             }
    //         });
    //     }

    //     if (attributes !== null) {
    //         for (let key in attributes) {
    //             if (key !== '') {
    //                 element.setAttribute(key, attributes[key])
    //             }
    //         }
    //     }

    //     if (text) {
    //         element.innerHTML = text;
    //     }

    //     return element;
    // },
}

export default element