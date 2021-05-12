function createElement(content: string): HTMLElement {
    const template = document.createElement('template');
    template.insertAdjacentHTML('afterbegin', content);
    return template.lastElementChild as HTMLElement
}

export default createElement