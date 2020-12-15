$(document).ready(function() {
    setInterval(() => {
        setTime();
    }, 1000);

    function setTime() {
        var dateWithouthSecond = new Date();
        let time = dateWithouthSecond.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        $('.clock').text(time);
        $('.date').text(dateWithouthSecond.toDateString());
    }

    setTime();
});
