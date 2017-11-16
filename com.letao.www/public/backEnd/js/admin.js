// 该文件的功能是用来写首页的js交互的
NProgress.configure({
    showSpinner: false
});
/*在ajax开始请求的时候  把进度条显示出来*/
$(window).ajaxStart(function(){
    NProgress.start();
});
/*在ajax结束请求的时候  把进度条完成*/
$(window).ajaxStart(function(){
    NProgress.done();
});
var cai = document.querySelector('.glyphicon-align-justify')
cai.onclick = function () {
    $('aside').toggle()
    $('.index_right').toggleClass('index_click')
}
$('.slign').on('click','[href="javascript:;"]',function () {

    $(this).siblings().stop().slideToggle()
})
$('#tuichu').on('click',function () {
    $.ajax({
        type:'get',
        url:'/employee/employeeLogout',
        date:{},
        success:function (res) {
            $('#myModal').modal('hide')
            setTimeout(function(){
                if(res.success){
                    /*7.退出成功*/
                    location.href = 'login.html';
                }
            },500);
        }
    })

})

