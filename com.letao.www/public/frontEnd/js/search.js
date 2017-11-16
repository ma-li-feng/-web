$(function () {

        // $('form').on('tap','span',function () {
        //     $.ajax({
        //         type:'get',
        //         url:'/product/queryProduct',
        //         data:{
        //
        //         }
        //
        //     })
        // })

    var huoqu = function () {
        return JSON.parse(localStorage.getItem('sousuo')||'[]')
    }
    var tianjia = function(value) {
        var arr = huoqu()
        if(value == ''){
            return
        }
        $.each(arr,function (i, item) {
            if(item == value){
                arr.splice(i,1)
            }
        })

        arr.push(value)
        window.localStorage.setItem('sousuo',JSON.stringify(arr))
    }
    var moban = function () {
        var data = huoqu()
        if(data.length != 0){
            $('.search-history').show()
            $('#sousuojieguo').hide()
            var html = template('moban',{data : data})
            $('.search-history-list').html(html)
        }else {
            $('.search-history').hide()
            $('#sousuojieguo').show()
        }
    }
    // tianjia('nick')
    var shanchu = function (value) {
        var arr = huoqu()
        // console.log(arr);
        $.each(arr,function (i, item) {
            if(item === value){
                // console.log(1);
                arr.splice(i,1)
            }
        })
        localStorage.setItem('sousuo',JSON.stringify(arr))
    }
    var clear = function () {
        localStorage.removeItem('sousuo')
    }

   moban()

    $('.search-box').on('tap','span',function () {
        tianjia($(this).siblings('input').val())
        location.href = '/frontEnd/searchList.html?key='+$(this).siblings('input').val()
       moban()
    })

    $('.search-history-list').on('tap','i',function () {
        // console.log(1);
        // console.log($(this).prev().text());
        shanchu($(this).prev().text())
        location.href = '/frontEnd/searchList.html?key='+$(this).prev().text()
        // shanchu('aa')
        moban()
    })

    url = "baidu.com?id=1&name='xiaoma'"
    var zifu = url.slice(url.indexOf('?')+1)
    var arr = zifu.split('&')
    // console.log(arr);
    var newArr = []
    var str = ''
    $.each(arr,function (i, item) {
        var obj = {}
        obj[item.split('=')[0]] = item.split('=')[1]

        // str+= '{'+item.split('=')[0]+':'+item.split('=')[1]+'}'
        newArr.push(obj)
    })
    console.log(newArr);


})