var ip = location.host;

$(document).ready(function(){
  console.log("app.js");

  $("#plus_sign").on("click",function () {
    $(this).css("display","none");
    $("#add_menu").slideDown();
  });

  $(".panel_type").on("click",function () {
    $("#add_menu").css("display","none");
    $("#"+$(this).data("type")).slideDown();
  });

  $(".add_btn").on("click",function () {
    console.log("add btn");
    var add_by = $(this).data("addby");
    var type = $(this).parent().parent().attr("id");
    var input_id = "#"+type+"_"+add_by;
    var input_val = $(input_id).val();
    var path = "";
    if(type == "youtube") path = type+"/"+add_by;
    else path = type 
    console.log(path);
  });

  $(".back_btn").on("click",function () {
    $(this).parent().parent().css("display","none");
    $("#add_menu").slideDown();
  });




});




function add_panel(path, target_id) {
  $.ajax({
    method:"post",
    timeout:"1000",
    contentType: 'application/json; charset=UTF-8',
    dataType   : 'json',
    data: JSON.stringify({user:$('#hiddenName').val()}),
    url: "http://"+ip+"/checkChatData",
    success: function(data){

    },
    error:function (err) {

    }
  });
}
