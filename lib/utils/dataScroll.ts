// import smoothscroll from 'smoothscroll-polyfill';

// smoothscroll.polyfill();

const dataScroll = (polyfill?: () => any) => {
    if (polyfill) {
        polyfill()
    }

    const btns = document.querySelectorAll('[data-scroll]')

    btns.forEach(btn => {
        btn.addEventListener('click', e => clickHandler(e))
    })

    HTMLElement.prototype.dataScroll = function() {
        this.addEventListener('click', e => clickHandler(e))
    }

    const clickHandler = (e: Event) => {
        const data = e.target.dataset.scroll;
        const target = document.querySelector(`[data-target-scroll="${data}"]`) as HTMLElement;

        if (target) {
            window.scroll({
                behavior: 'smooth',
                left: 0,
                top: target.offsetTop
            });
        }
    }

}


export default dataScroll