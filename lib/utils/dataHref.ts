const dataHref = () => {
    const selector = '[data-href]';
    const dataAttr = 'data-href';
    const targetAttr = 'target';

    document.addEventListener('click', e => clickHandler(e))
    document.addEventListener('mousedown', e => doubleclick(e))

    Element.prototype.dataHref = function () {
        this.addEventListener('click', e => clickHandler(e))
        this.addEventListener('mousedown', (e) => doubleclick(e as MouseEvent))
    }

    function clickHandler(e: Event) {
        const target = e.target as Element;

        if (target.closest(selector) || target.hasAttribute(dataAttr)) {
            click(target.closest(selector) || target)
        }

        function click(target: Element) {
            if (target.hasAttribute(targetAttr)) {
                window.open(target.getAttribute(dataAttr), target.getAttribute(targetAttr));
            } else {
                document.location.href = target.getAttribute(dataAttr);
            }
        }
    }

    function doubleclick(e: MouseEvent) {
        const target = e.target as Element;

        if ((target.closest(selector) || target.hasAttribute(dataAttr)) && e.which == 2) {
            window.open(target.closest(selector).getAttribute(dataAttr) || target.getAttribute(dataAttr), '_blank');
        }
    }
}


export default dataHref