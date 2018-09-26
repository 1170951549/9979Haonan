(function(){
  $(".Hui-aside dl").on("click",function(){
    console.log($(this))
    $(".Hui-aside dl dd").hide();
    $(".Hui-aside dl").eq($(".Hui-aside dl dd").index($(this))).show()
  })
})
