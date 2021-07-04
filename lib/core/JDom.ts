import createElement from '../utils/createElement';

export type JDomCreateProps = string | Element | NodeListOf<Element> | JDom;

export type JDomCreate = (element: JDomCreateProps) => JDom;

export function $(element: JDomCreateProps): JDom {
    return new JDom(element)
};

class JDom {
    element: Array<any>;
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

        document.querySelector
    }

    get<E extends HTMLElement>(index: number = 0): E {
        return this.element[index];
    }

    find(element: string) {
        if (typeof element !== 'string') {
            return element;
        }

        return new JDom(this.get().querySelectorAll(element));
    }

    addClass(...classes: string[]) {
        this.each(el => {
            el.classList.add(...classes);
        })

        return this;
    }

    attr(attrs: string | { [key: string]: any } | Array<string>, value?: string) {
        if (value === null) {
            if (typeof attrs === 'string') {
                this.each(el => {
                    el.removeAttribute(attrs);
                });
            } else if (Array.isArray(attrs)) {
                for (let i = 0; i < attrs.length; i++) {
                    this.each(el => {
                        el.removeAttribute(attrs[i])
                    });
                }
            }
        } else {
            if (value === undefined) {
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
                        this.each(el => {
                            el.setAttribute(key, attrs[key]);
                        });
                    }
                }
            } else {
                if (typeof attrs === 'string') {
                    this.each(el => {
                        el.setAttribute(attrs, value);
                    })
                } else if (Array.isArray(attrs)) {
                    for (let i = 0; i < attrs.length; i++) {
                        this.each(el => {
                            el.setAttribute(attrs[i], value)
                        });
                    }
                }
            }
        }


        return this;
    }

    hasAttr(attrs: string) {
        return this.element[0].hasAttribute(attrs);
    }

    on(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions) {
        this.each(el => {
            el.addEventListener(type, listener, options);
        });

        return this;
    }

    off(type: string, listener: EventListenerOrEventListenerObject, options?: boolean  | EventListenerOptions) {
        this.each(el => {
            el.removeEventListener(type, listener, options);
        });

        return this;
    }

    closest(selector: string) {
        return new JDom(this.get().closest(selector));
    }

    each(callbackfn: <E extends HTMLElement>(value: E, index: number, array: E[]) => void) {
        this.element.forEach(callbackfn);

        return this;
    }

    toggleAttribute(attr: string) {
        this.each((el) => {
            el.toggleAttribute(attr)
        })

        return this;
    }

    append<E extends Element>(element: E) {
        this.get().appendChild(element)

        return this;
    }

    remove() {
        this.each((el) => {
            el.remove()
        })

        return this;
    }

    set text(text: string) {
        this.each((el) => {
            el.innerText = text;
        })
    }

    get text() {
        return this.get().innerText;
    }

    set html(html: string) {
        this.each((el) => {
            el.innerHTML = html;
        })
    }

    get html() {
        return this.get().innerHTML;
    }

    set value(val: string) {
        this.each((el) => {
            if (el instanceof HTMLInputElement) {
                el.value = val;
            }
        })
    }

    get value() {
        return this.get<HTMLInputElement>().value;
    }

    get dataset() {
        return this.get().dataset;
    }

    get scrollHeight() {
        return this.get().scrollHeight;
    }

    get style() {
        return this.get<HTMLElement>().style;
    }

    // get toggle() {
    //     return {
    //         attr: this.toggleAttr.bind(this)
    //     }
    // }
}

export { JDom }