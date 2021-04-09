const event = {
    /**
     * Отслеживает окончание tranistion css на элементе
     * element.addEventListener(transitionEnd, cb)
     */
    transitionEnd(){
        var t,
            el = document.createElement("fakeelement");

        var transitions: any = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions){
            const idx: any = t;

            if (el.style[idx] !== undefined){
                return transitions[idx];
            }
        }
    },

    /**
     * Отслеживает окончание animation css на элементе
     * element.addEventListener(animationEnd, cb)
     */
    animationEnd(){
        var t,
            el = document.createElement("fakeelement");

        var animations: any = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations){
            const idx: any = t;

            if (el.style[idx] !== undefined){
                return animations[idx];
            }
        }
    }
}


export default event