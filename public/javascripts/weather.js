
var datetime = null,
        date = null;

var update = function () {
    date = moment(new Date())
    datetime = date.format('MMM Do YYYY, h:mm:ss a');
    $('#datetime').html(datetime)
};

$(document).ready(function(){

    datetime = $('#datetime')
    update();

    setInterval(update, 1000);
});
