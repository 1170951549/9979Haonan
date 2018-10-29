var pageModel = {
  pageLength: 10,
  currentPage:1,
  totalPage: -1,
  totalItems:-1,
}
$(function () {
  Vue.component('pagination', {
    data:function(){
      return {
        selectObj : ["first", "previous", "next", "last"],
        pageModel
      }
    },
    props: ['input'],
    template: "<div><label style='float: left;font-weight: normal;'>当前页数 <font color='red'>{{pageModel.currentPage}}</font>/<font style='margin-right:20px' color='red'>{{pageModel.totalPage}} </font> 每页显示"
    +"<select v-model='pageModel.pageLength' v-on:change='pageLengthChange(pageModel.pageLength)'><option>10</option><option>20</option><option>50</option><option>100</option></select>&nbsp;&nbsp;总数:<font color='red'>{{pageModel.totalItems}}</font ></label>"
    +"<ul style='margin: 0;float: right;' class='pagination'>"
    +"<label><div class='input-group'><input v-model='input' style='margin-left:30px;margin-right:5px;width: 80px;' type='text' class='form-control' placeholder='选择页数'><span class='input-group-btn'>" +
    "<button v-on:click='jumpToPage' title='跳转到指定页' class='btn btn-primary' type='button'>跳转</button></span></div></label>"
    +"<li v-on:click='pageClick(selectObj[0])'><a href='#'>首页</a></li>"
    +"<li v-on:click='pageClick(selectObj[1])'><a href='#'>上一页</a></li>"
    +"<li v-on:click='pageClick(selectObj[2])'><a href='#'>下一页</a></li>"
    +"<li v-on:click='pageClick(selectObj[3])'><a href='#'>尾页</a></li></ul></div>",
    methods:{
      pageClick:function(obj){
        switch(obj){
          case "first":
            pageModel.currentPage = 1;
            break;
          case "previous":
            if(pageModel.currentPage > 1){
              pageModel.currentPage --;
            }
            break;
          case "next":
            if(pageModel.currentPage < pageModel.totalPage){
              pageModel.currentPage ++;
            }
            break;
          case "last":
            pageModel.currentPage = pageModel.totalPage;
            break;
        };
        this.$emit("reload");
      },
      jumpToPage:function(){
        var val = parseInt(this.input);
        if(val > 0 && val <=pageModel.totalPage){
          pageModel.currentPage = val;
        }else{
          alert("输入页数不正确");
        }
        this.$emit("reload");
      },
      pageLengthChange:function(i){
        pageModel.pageLength = i;
        pageModel.currentPage = 1;
        this.$emit("reload");
      }
    }
  })
})
