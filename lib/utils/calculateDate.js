/**
 * @description Вычисляет оставшиеся время
 *
 * @param {string} time дата в миллисекундах
 * @return {object} Обьект с данным по времени
 */
function calculateDate(time) {
    let dateEnd = new Date(time),
        dateStart = new Date(),
        timeMilliseconds = /*(dateEnd - (1000*60*60*24*4)) */dateEnd - dateStart,
        day = Math.floor(timeMilliseconds/1000/60/60/24),
        hours = Math.floor(timeMilliseconds/1000/60/60),
        minutes = Math.floor((timeMilliseconds-hours*60*60*1000)/1000/60),
        seconds = Math.floor(((timeMilliseconds-hours*60*60*1000)-minutes*60*1000)/1000),
        currentHours = hours - (24 * day);

    function convertTime(time){
        var digitTime = time >= 10 ? time : "0"+time.toString();
        return digitTime;
    }

    var time = convertTime(hours).toString() + ':' + convertTime(minutes).toString() + ':' + convertTime(seconds).toString();

    return {
        time,
        timeMilliseconds,
        day,
        currentHours,
        hours: convertTime(hours),
        minutes: convertTime(minutes),
        seconds: convertTime(seconds)
    };
}

export default calculateDate