$(document).ready(function(){
  //console.log("loaded");
  $('.submit').on('click',function(event){
    //console.log("clicked");
    event.preventDefault();
    var form = $(this).parent("form");
    var confirmed;
    if(this.dataset.confirm) confirmed = confirm(this.dataset.confirm);
    if(confirmed!==false) form.submit();
  });
});
