const event = {
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