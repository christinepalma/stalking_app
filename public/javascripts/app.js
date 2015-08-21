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
    var add_by = $($(this)[0][1]).data("addby");
    var type = $(this).parent().attr("id");
    var path = "";
    if(type == "youtube") path = type+"/"+add_by;
    else path = type;

    var input_id = "#"+type+"_"+add_by;
    var input_val = $(input_id).val();
    $(input_id).val("");
    var panel_num=$(".panel").length;
    add_panel(user_id, type, path, input_val, panel_num);
  });

  $(".back_btn").on("click",function () {
    $(this).parent().parent().parent().css("display","none");
    $("#add_menu").slideDown();
  });

  $(".delete_panel").on("click",delete_panel);
});

function delete_panel (event) {
  event.preventDefault();
  delete_panel_ajax($(this).data("panelid"));
}

function add_panel(owner, name, type, target_id, order) {
  $.ajax({
    method:"post",
    timeout:"1000",
    contentType: 'application/json; charset=UTF-8',
    dataType   : 'json',
    data: JSON.stringify({owner:owner, name:name, type:type, target_id:target_id, order:order}),
    url: "http://"+ip+"/panels",
    success: function(data){
      var panel_column=document.createElement("div");
      $(panel_column).addClass("col-xs-12 col-sm-6 col-md-6 col-lg-4 column");
      $(panel_column).attr('id', data.data._id);
      var panel=document.createElement("div");
      $(panel).addClass("panel");
      $(panel_column).append(panel);
      var panel_header=document.createElement("div");
      $(panel_header).addClass("panel_header");
      $(panel_header).append(type+" <a href='#' class='delete_panel' data-panelid="+data.data._id+">[x]</a>");
      $(panel).append(panel_header);
      $(panel).append("<embed class='embedded_panel' src="+type+"/"+target_id+"></embed>");
      $(panel_column).insertBefore(".last_panel");

      $(".delete_panel").on("click",delete_panel);

      console.log("panel added : "+data.data._id);
    },
    error:function (err) {
      console.log("failure - panel add");
    }
  });
}

function delete_panel_ajax(panel_id) {
  $.ajax({
    method:"delete",
    timeout:"1000",
    url: "http://"+ip+"/panels/"+panel_id,
    success: function(data){
      console.log("panel deleted");
      $("#"+panel_id).remove();
    },
    error:function (err) {
      console.log("failure - panel delete");
    }
  });
}
