const event = {
    /**
     * Отслеживает окончание tranistion css на элементе
     * element.addEventListener(transitionEnd, cb)
     */
    transitionEnd(){
        var t,
            el = document.createElement("fakeelement");

        var transitions = {
        "transition"      : "transitionend",
        "OTransition"     : "oTransitionEnd",
        "MozTransition"   : "transitionend",
        "WebkitTransition": "webkitTransitionEnd"
        }

        for (t in transitions){
            if (el.style[t] !== undefined){
                return transitions[t];
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

        var animations = {
        "animation"      : "animationend",
        "OAnimation"     : "oAnimationEnd",
        "MozAnimation"   : "animationend",
        "WebkitAnimation": "webkitAnimationEnd"
        }

        for (t in animations){
            if (el.style[t] !== undefined){
                return animations[t];
            }
        }
    }
}

export default event