$(function(){
var form = layui.form 
var layer = layui.layer
//获取类别数据
showArtList()
//为添加类别按钮绑定点击事件
var indexAdd = null
$('#addCateBtn').on('click',function(){
//弹出层包含列表内容
indexAdd = layer.open({
    type:1,
    area:['500px','250px'],
    title:'添加文章分类',
    content:$("#tpl_addCate").html()
})
//弹出层会返回一个索引



})

//为form表单绑定submit提交事件
$('body').on('submit','#form-add',function(e){
    e.preventDefault()
    $.ajax({
        method:"POST",
        url:"/my/article/addcates",
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){
                return layer.msg("新增文章分类失败")
            }
            layer.msg("新增文章分类成功")
            showArtList()
            //根据索引关闭对应的弹出层
            layer.close(indexAdd)
        }
    })
})
var indexEdit = null 
//通过代理 给编辑按钮绑定点击事件 
$('tbody').on('click','.btn-edit',function(){
    indexEdit = layer.open({
        type:1,
        area:['500px','250px'],
        title:"修改文章分类",
        content:$('#tpl_modifyCate').html()
    })
    var id = $(this).attr('data-id')
    //请求对应id的那条数据
    $.ajax({
        method:"GET",
        url:"/my/article/cates/" + id,
        success:function(res){
            form.val("form-edit",res.data)
        }
    })
})
$('body').on('submit','#form-edit',function(e){
e.preventDefault()
$.ajax({
    method:"POST",
    url:"/my/article/updatecate",
    data:$(this).serialize(),
    success:function(res){
        if (res.status !== 0) {
            return layer.msg('更新分类数据失败！')
          }
          layer.msg('更新分类数据成功！')
   layer.close(indexEdit)
   showArtList()
        }
})
})
//为删除按钮绑定点击事件
$('tbody').on('click','.btn-delete',function(){
    var id = $(this).attr('data-id')
    layer.confirm('确认要删除吗？',{icon:3,title:'温馨提示'},function(index){
     $.ajax({
         method:'GET',
         url:'/my/article/deletecate/' + id,
         success:function(res){
            if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              showArtList()
         }
     })


    })
})



})
//获取文章分类的列表
function showArtList(){
//发起get请求获取文章列表的数据
$.ajax({
    method: 'GET',
    url: '/my/article/cates',
    success: function(res) {
    console.log(res);
    //使用模板引擎将数据渲染到页面中
    var htmlStr = template("tpl_cate",res)
    $('tbody').html(htmlStr)
    }
})

 

    
}
