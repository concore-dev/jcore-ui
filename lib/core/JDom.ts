export type IJDom = JDom;

declare global {
    interface Window {
        j: any
        jdom: any
    }

    const j: any;
    const jdom: any;
}

class JDom {
    element: Array<HTMLElement>;

    constructor(element: any) {
        if (typeof element === 'string') {
            this.element = Array.from(document.querySelectorAll(element));
        } else if (element instanceof HTMLElement) {
            this.element = [element];
        } else if (element instanceof NodeList) {
            this.element = Array.from(element as NodeListOf<HTMLElement>);
        }
    }

    get(index?: number) {
        if (index !== undefined) {
            return this.element[index];
        }

        return this.element[0]
    }

    find(element: string) {
        if (typeof element !== 'string') {
            return element
        }

        this.element = Array.from(document.querySelectorAll(element));

        return new JDom(element);
    }

    addClass(...classes: string[]) {
        this.element.forEach(el => {
            el.classList.add(...classes)
        })

        return this;
    }
}

if (typeof window.j === 'undefined') {
    window.j = function(element: any) {
        return new JDom(element)
    };
}

if (typeof window.jdom === 'undefined') {
    window.jdom = JDom
}

export default JDom