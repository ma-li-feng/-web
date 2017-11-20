$(function(){
    // 1、点击第八个菜单进行切换
    $("#menu").on("click",".row>div:nth-child(8)",function(){
        // alert(1)
        $("#menu>.row>div:nth-last-child(-n+4)").toggle();
    })
    // 获取菜单样式
    getMenuStyle();

    getRecommendStyle();
})

// 获取menu的数据
function getMenuStyle(){
    $.ajax({
        url:url+"api/getindexmenu",
        success:function(data){
            // console.log(data);
            var html = template("menuTpl",data);
            $("#menu .row").html(html);
        }
    })
}

function getRecommendStyle(){
    $.ajax({
        url:url+"api/getmoneyctrl",
        success:function(info){
            // console.log(info);
            var html = template("getRecommendStyle",info);
            $("#recommend .recommend_product").html(html);
        }
    })
}
