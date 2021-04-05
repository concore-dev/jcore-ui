import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();

const dataScroll = () => {
    const btns = document.querySelectorAll('[data-scroll]')

    btns.forEach(btn => {
        btn.addEventListener('click', e => clickHandler(e))
    })

    HTMLElement.prototype.dataScroll = () => {
        this.addEventListener('click', e => clickHandler(e))
    }

    const clickHandler = e => {
        const data = e.target.dataset.scroll
        const target = document.querySelector(`[data-target-scroll="${data}"]`)
        console.log(data)
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