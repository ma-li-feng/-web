$(function ($) {
    sousuo()
    var flag = true
    $('.jiage').on('tap',function () {
        if(flag){
           sousuo(1,5,1,null)
            flag = false
        }else {
            sousuo(1,5,2,null)
            flag = true
        }
    })
    $('.xiaoliang').on('tap',function () {
        if(flag){
            sousuo(1,5,null,2)
            flag = false
        }else {
            sousuo(1,5,null,1)
            flag = true
        }
    })
    $('.search-result-list').on('click','button',function () {
        // console.log($(this).data('id'));
        location.href = '/frontEnd/detail.html?id='+$(this).data('id')
    })

    mui.init({
        pullRefresh : {
            container:"#refreshContainer",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
               callback: pulldownRefresh
            }
        }
    });
    function pulldownRefresh() {
        setTimeout(function () {
            sousuo(1,5,1,null);//实现更新页面的操作
            mui('#refreshContainer').pullRefresh().endPulldownToRefresh(); //refresh completed
        }, 1000);
    }

})
var sousuo = function (page,pageSize,price,num) {
    var myurl = new URLSearchParams(location.search);
    var proName = myurl.get('key')
    $.ajax({
        type:'get',
        url:' /product/queryProduct',
        data : {
            proName : proName,
            page : page || 1,
            pageSize : pageSize || 5,
            price : price ||null,
            num : num || null
        },
        success:function (data) {
            var moban = template('moban',data)
            $('.search-result-list').html(moban)

        }
    })
}
