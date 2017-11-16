$(function ($) {
    var qingqiu = function (num) {
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:num||1,
                pageSize:5
            },
            dataType:'json',
            success:function (res) {
                console.log(1);
                console.log(res);
                var userNews = template('yhmb', res);
                $('tbody').html(userNews)
            }
        })
    }
    qingqiu()














})