var month =["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

$(document).ready(function(){
  console.log("loaded");
  $("header").css("background", "url("+$("header").data("url")+") no-repeat center");
  $("header").css("background-size", "cover");

  $(".tweet_time").each(function(){
    var date = new Date($(this).data("time"));
    $(this).html(((date.getHours().toString().length==1)?("0"+date.getHours()):(date.getHours()))+":"
                +((date.getMinutes().toString().length==1)?("0"+date.getMinutes()):(date.getMinutes()))+" "
                +month[date.getMonth()]+" "
                +((date.getDate().toString().length==1)?("0"+date.getDate()):(date.getDate()))+", "
                +date.getFullYear());
  });

  $(".tweet_content").each(function(){
    var content = $(this).html();

    var url_array = $(this).data("urls").split(',');
    url_array.forEach(function (url) {
      if(url) content = content.replace(url,"<a href='"+url+"' target='_blank'>"+url+"</a>");
    });

    var pic_array = $(this).data("pics").split(',');
    pic_array.forEach(function (pic) {
      if(pic) content = content.replace(pic,"<img class='tweet_img' src='"+pic+"'>");
    });
    console.log(content);
    $(this).html(content);
  });
});
