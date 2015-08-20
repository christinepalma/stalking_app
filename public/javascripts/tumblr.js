var month =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

$(document).ready(function(){
  console.log("loaded");
  $("header").css("background", "url("+$("header").data("url")+") no-repeat center");
  $("header").css("background-size", "cover");

  $(".feed_time").each(function(){
    var date = new Date($(this).data("time"));
    $(this).html(((date.getHours().toString().length==1)?("0"+date.getHours()):(date.getHours()))+":"
                +((date.getMinutes().toString().length==1)?("0"+date.getMinutes()):(date.getMinutes()))+" "
                +month[date.getMonth()]+" "
                +((date.getDate().toString().length==1)?("0"+date.getDate()):(date.getDate()))+", "
                +date.getFullYear());
  });

});
