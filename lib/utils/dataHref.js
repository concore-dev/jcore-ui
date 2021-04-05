const dataHref = () => {
    const selector = '[data-href]';
    const dataAttr = 'data-href';
    const targetAttr = 'target';

    document.addEventListener('click', e => clickHandler(e))
    document.addEventListener('mousedown', e => doubleclick(e))

    Element.prototype.dataHref = function () {
        this.addEventListener('click', e => clickHandler(e))
        this.addEventListener('mousedown', e => doubleclick(e))
    }

    function clickHandler(e) {
        const target = e.target;

        if (target.closest(selector) || target.hasAttribute(dataAttr)) {
            click(target.closest(selector) || target)
        }

        function click(target) {
            if (target.hasAttribute(targetAttr)) {
                window.open(target.getAttribute(dataAttr), target.getAttribute(targetAttr));
            } else {
                document.location.href = target.getAttribute(dataAttr);
            }
        }
    }

    function doubleclick(e) {
        const target = e.target;

        if ((target.closest(selector) || target.hasAttribute(dataAttr)) && e.which == 2) {
            window.open(target.closest(selector).getAttribute(dataAttr) || target.getAttribute(dataAttr), '_blank');
        }
    }
}

export default dataHref