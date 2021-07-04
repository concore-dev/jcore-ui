import createElement from '../utils/createElement';

export type JDomCreateProps = string | HTMLElement | NodeList | JDom;

export type JDomCreate = (element: JDomCreateProps) => JDom;

export function $(element: JDomCreateProps): JDom {
    return new JDom(element)
};

interface JDom {
    element: Array<HTMLElement>;
}

class JDom {
    static fn: JDom = JDom.prototype;

    constructor(element: any) {
        if (typeof element === 'string') {
            if (element.indexOf('<') >= 0 && element.indexOf('>') >= 0) {
                this.element = [createElement(element)];
            } else {
                this.element = Array.from(document.querySelectorAll(element));
            }
        } else if (element instanceof HTMLElement) {
            this.element = [element];
        } else if (element instanceof NodeList) {
            this.element = Array.from(element as NodeListOf<HTMLElement>);
        } else if (Array.isArray(element)) {
            this.element = element;
        } else if (element instanceof JDom) {
            this.element = [element.get()];
        }
    }

    get(index: number = 0) {
        return this.element[index];
    }

    find(element: string) {
        if (typeof element !== 'string') {
            return element;
        }

        return new JDom(this.get().querySelectorAll(element));
    }

    addClass(...classes: string[]) {
        this.element.forEach(el => {
            el.classList.add(...classes);
        })

        return this;
    }

    attr(attrs: string | { [key: string]: any } | Array<string>, value?: string) {
        if (!value) {
            if (typeof attrs === 'string') {
                return this.element[0].getAttribute(attrs);
            } else if (Array.isArray(attrs)) {
                const needAttrs: any = {};

                for (let i = 0; i < attrs.length; i++) {
                    needAttrs[attrs[i]] = this.element[0].getAttribute(attrs[i]);
                }

                return needAttrs;
            } else if (typeof attrs === 'object') {
                for (const key in attrs) {
                    this.element.forEach(el => {
                        el.setAttribute(key, attrs[key]);
                    });
                }
            }
        } else {
            if (typeof attrs === 'string') {
                this.element.forEach(el => {
                    el.setAttribute(attrs, value);
                })
            } else if (Array.isArray(attrs)) {
                for (let i = 0; i < attrs.length; i++) {
                    this.element.forEach(el => {
                        el.setAttribute(attrs[i], value)
                    });
                }
            }
        }

        return this;
    }

    hasAttr(attrs: string) {
        return this.element[0].hasAttribute(attrs);
    }

    removeAttr(attrs: string | Array<string>) {
        if (typeof attrs === 'string') {
            this.element.forEach(el => {
                el.removeAttribute(attrs);
            });
        } else if (Array.isArray(attrs)) {
            for (let i = 0; i < attrs.length; i++) {
                this.element.forEach(el => {
                    el.removeAttribute(attrs[i])
                });
            }
        }

        return this;
    }

    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        this.element.forEach(el => {
            el.addEventListener(type, listener, options);
        });
    }

    removeOn(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions) {
        this.element.forEach(el => {
            el.removeEventListener(type, listener, options);
        });
    }

    closest<E extends HTMLElement = HTMLElement>(selector: string) {
        return new JDom(this.get().closest(selector));
    }
}

export { JDom }