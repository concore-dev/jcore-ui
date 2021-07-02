declare global {
    interface Window {
        // $: JDomCreate;
        // jdom: any;
    }
}

export type JDomCreate = (element: string | HTMLElement | NodeList) => JDom;

export function $(element: string | HTMLElement | NodeList): JDom {
    return new JDom(element)
};

export class JDom {
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

        if (this.element[0] !== undefined) {
            return this.element[0];
        }

        return null;
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