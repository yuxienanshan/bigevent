$(function(){

    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
//定义格式化时间 的过滤器
template.defaults.imports.dataFormat = function(date){
    const dt = new Date(date)
    var y = dt.getFullYear()
    var m = zeroPadding(dt.getMonth + 1) 
    var d = zeroPadding(dt.getDate())
    var hh = zeroPadding(dt.getHours())
    var mm = zeroPadding(dt.getMinutes())
    var ss = zeroPadding(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
}

//定义补0函数
function zeroPadding(m){
return n>9? n:'0' + n
}

// 定义一个查询的参数对象，将来请求数据的时候，
  // 需要将请求参数对象提交到服务器
  var q = {
    pagenum: 1, // 页码值，默认请求第一页的数据
    pagesize: 2, // 每页显示几条数据，默认每页显示2条
    cate_id: '', // 文章分类的 Id
    state: '' // 文章的发布状态
  }

  tableShow() 

  optionShow()

//获取文章列表数据的方法
function optionShow(){
$.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function(res) {
      if (res.status !== 0) {
        return layer.msg('获取分类数据失败！')
      }
      // 调用模板引擎渲染分类的可选项
      var htmlStr = template('tpl-list', res)
      $('[name=cate_id]').html(htmlStr)
      // 通过 layui 重新渲染表单区域的UI结构
      form.render()
    }
})

}

function tableShow(){
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: q,
        success: function(res) {
          if (res.status !== 0) {
            return layer.msg('获取文章列表失败！')
          }
          // 使用模板引擎渲染页面的数据
          console.log(res);
          var htmlStr = template('tpl_table', res)
          $('tbody').html(htmlStr)
          // 调用渲染分页的方法
          renderPage(res.total)
        }
    })
}




    //把最新的额条目数赋值给pagesize
//删除文章的功能，点击事件 弹出成 确定按钮点击事件 重新渲染页面
// $('tbody').on('click','',function(){
// //绑定事件后确认事件是否绑定成功
// var id = $(this).attr('data-id')
// const len = $().length //获取当前页面所有的删除按钮的个数 ，id是唯一的最终获取只有一个值，所以这里用类选择器

// layer.confirm('确定要删除吗？',{},function(index){
//     $.ajax({
//         method:'get',
//         url:'/my/article/delete/'+ id,
//         success:function(res){
//             if(res.status !== 0){
//                 return layer.msg("删除文章失败")
//             }
//             layer.msg('删除文章成功')
//             //判断当前页面是否还有数据，如果没有那么页码值减一，在重新调取数据
//             if(len === 1){
// q.pagenum = q.pagenum === 1?1:q.pagenum -1
//             }
//             initTable()//重新渲染页面的函数，

//         }
//     })
// })



// })

// $().on('click','',function(){
//     let id = $(this).attr('data-id')
//     localStorage.setItem('id',id)
//     location.href = "article/art_edit.html"
// })




//-----------
})

// 在编辑js中的操作
// 初始化 文本编辑器
// initEditor()
// initCate()
//获取编辑文章的id
//请求这个id对应的文章的数据
//获取成功填充到form表单中 lay-filter form.val
//回显图片 更改img的src属性，拼接根路径
//裁减区域
