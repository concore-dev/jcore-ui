function dateEnd(time: number) {
    let dateEnd = time,
        dateStart = new Date().getTime(),
        timeMilliseconds = dateEnd - dateStart,
        day = Math.floor(timeMilliseconds/1000/60/60/24),
        hours = Math.floor(timeMilliseconds/1000/60/60),
        minutes = Math.floor((timeMilliseconds-hours*60*60*1000)/1000/60),
        seconds = Math.floor(((timeMilliseconds-hours*60*60*1000)-minutes*60*1000)/1000),
        currentHours = hours - (24 * day);

    function convertTime(time: number) {
        var digitTime = time >= 10 ? time : "0"+time.toString();
        return digitTime;
    }

    return {
        time: convertTime(hours).toString() + ':' + convertTime(minutes).toString() + ':' + convertTime(seconds).toString(),
        timeMilliseconds,
        day,
        currentHours,
        hours: convertTime(hours),
        minutes: convertTime(minutes),
        seconds: convertTime(seconds)
    };
}

export default dateEnd