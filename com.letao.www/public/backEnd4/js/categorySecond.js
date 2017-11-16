$(function () {
  // 获取数据列表
  var getSecondData = function (pageNum) {
    $.ajax({
      type: 'get',
      url: '/category/querySecondCategoryPaging',
      data: {
        page: pageNum||1,
        pageSize: 5
      },
      dataType: 'json',
      success: function (data) {
        // console.log(data);
        var secondResult = template('second-template',data);
        $('tbody').html(secondResult);

        $('.pagination').bootstrapPaginator({
          /*当前使用的是3版本的bootstrap*/
          bootstrapMajorVersion: 3,
          /*配置的字体大小是小号*/
          size: 'small',
          /*当前页*/
          currentPage: data.page,
          /*一共多少页*/
          // 总页数=数据的总数/每页显示多少条数据
          totalPages: Math.ceil(data.total / data.size),
          /*点击页面事件*/
          onPageClicked: function (event, originalEvent, type, page) {
            /*改变当前页再渲染 page当前点击的按钮的页面*/
            getSecondData(page);
          }
        });








      }
    })
  }

  getSecondData();

  $('#first-modal').on('click','#dLabel',function () {
      $.ajax({
          type:'get',
          url: ' /category/queryTopCategoryPaging',
          data: {
              page: 1,
              pageSize: 100
          },
          dataType:'json',
          success:function (res) {
              var html = ''
              $.each(res.rows,function (i, item) {
                  html+='<li><a href="javascript:;" id="'+item.id+'">'+item.categoryName+'</a></li>'
                  $('.dropdown-menu').html(html)
              })
              $('.dropdown-menu').on('click','a',function () {
                 $('#dLabel').html($(this).html()+' <span class="caret"></span>')
                  // $('#categoryId').val($(this).id)
                  // console.log();
                  $('#categoryId').val($(this).attr('id'))
              })
          }
      })
  })
    var imgurl = ''
$('#pic').fileupload({
    url:'/category/addSecondCategoryPic',
    dataType: 'json',
    done: function (e, data) {
        // data.context.text('Upload finished.');
        // console.log(data);
        $('.preview img').attr('src',data.result.picAddr)
        imgurl = data.result.picAddr
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
        console.log(date);
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






















})