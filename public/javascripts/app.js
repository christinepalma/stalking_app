var ip = location.host;

$(document).ready(function(){

  console.log("app.js");

  var user_id = $(".welcome").data("userid");

  $("#plus_sign").on("click",function () {
    $(this).css("display","none");
    $("#add_menu").slideDown();
  });

  $(".panel_type").on("click",function () {
    $("#add_menu").css("display","none");
    $("#"+$(this).data("type")).slideDown();
  });

  $(".add_panel").on("submit",function (event) {
    event.preventDefault();
    //console.dir($($(this)[0][0]).val());
    var add_by = $($(this)[0][1]).data("addby");
    var type = $(this).parent().attr("id");
    var path = "";
    if(type == "youtube") path = type+"/"+add_by;
    else path = type;

    var input_id = "#"+type+"_"+add_by;
    var input_val = $(input_id).val();
    var panel_num=$(".panel").length;
    console.log(user_id);
    console.log(type);
    console.log(path);
    console.log(input_val);
    console.log(panel_num);
    add_panel(user_id, type, path, input_val, panel_num);
  });

  $(".back_btn").on("click",function () {
    $(this).parent().parent().parent().css("display","none");
    $("#add_menu").slideDown();
  });




});




function add_panel(owner, name, type, target_id, order) {
  $.ajax({
    method:"post",
    timeout:"1000",
    contentType: 'application/json; charset=UTF-8',
    dataType   : 'json',
    data: JSON.stringify({owner:owner, name:name, type:type, target_id:target_id, order:order}),
    url: "http://"+ip+"/panels",
    success: function(data){
      console.log("success");
    },
    error:function (err) {
console.log("falure");
    }
  });
}
