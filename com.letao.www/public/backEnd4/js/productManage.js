$(function(){
  var getProductData = function(pageNum){
    $.ajax({
      type:'get',
      url:' /product/queryProductDetailList',
      data:{
        page:pageNum||1,
        pageSize: 5
      },
      success:function(data){
        // console.log(data);
        var productResult = template('product-template',data);
        $('tbody').html(productResult);
      }
    })
  }


  getProductData();

    //文件上传成功
    var arr = []
    var html = ''
    $('#pic').fileupload({
        url:' /product/addProductPic',
        dataType: 'json',
        done: function (e, data) {
            // data.context.text('Upload finished.');
            // console.log(data);
            // $('.preview img').attr('src',data.result.picAddr)
            // imgurl = data.result.picAddr
            html+= '<img width="100" src="'+data.result.picAddr+'" alt="">'
            $('#pics').html(html)
            arr.push(data.result)
            // console.log(arr);
        }
    });
    $('#tijiao').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            // 字段名是name属性的值
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '一级分类名称不能为空'
                    }
                }
            }
        }
    }).on('success.form.bv', function (e) {
        // Prevent form submission
        e.preventDefault();
        var date = $('form').serialize()
        var date = date + '&brandLogo='+ imgurl
        // console.log(date);
        $.ajax({
            type:'post',
            url: '/category/addSecondCategory',
            data: date,
            dataType: 'json',
            success:function (res) {
                getSecondData()
            }
        })

    });

  var biaodan = function () {
    $('#first-modal').on('click','#save',function () {
        // var data = $('form').serialize()
        // console.log(data);
        $('#sptj').bootstrapValidator({
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },
            fields: {
                // 字段名是name属性的值
                categoryName: {
                    validators: {
                        // notEmpty: {
                        //     message: '一级分类名称不能为空'
                        // }
                    }
                }
            }
        }).on('success.form.bv', function (e) {
            // Prevent form submission
            e.preventDefault();
            var date = $('form').serialize()
            var date = date
            var pinjie = ''
            $.each(arr,function (i, item) {
                pinjie += '&picName'+(i+1)+'='+item.picName+'&picAddr'+(i+1)+'='+item.picAddr
                // "picName":"24-1.png","picAddr":"product/24-1.png"
            })
            // console.log(date+pinjie);
            date = date+pinjie+'&brandId=3'
            $.ajax({
                type:'post',
                url: '/product/addProduct',
                data: date,
                // dataType: 'json',
                success:function (res) {
                    // getSecondData()
                }
            })

        });


    })
  }
  biaodan()


















})