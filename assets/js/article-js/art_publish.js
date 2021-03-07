$(function(){
    var form =layui.form
    var layer = layui.layer
//定义加载文章分类的方法
initCate()
initEditor()
function initCate(){

$.ajax({
    method:'GET',
    url:'/my/article/cates',
    sucess:function(res){
        if(res.status !==0){
            return layer.msg("初始化文章分类失败")
        }
var htmlStr = template('tpl-cate',res)
$('[name=cate_id]').html(htmlStr)
//一定要调用render方法 
form.render()//？

    }
})

}
//
var $image = $('#image')

  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }

  // 3. 初始化裁剪区域
  $image.cropper(options)



// $().on('click',function(){
//     $('').click()
// })
$('#btnChooseImage').on('click', function() {
    $('#coverFile').click()
  })
 $('#coverFile').on('change',function(e){
     var files= e.target.files
     if(files.length === 0) {
         return
     }
     var newImgURL = URL.createObjectURL(files[0])
     $image
          .cropper('destory')
          .attr('src',newImgURL)
          .cropper(options)
 })
 //定义文章的发布状态
var art_state = '已发布'
//存为草稿按钮绑定点击事件
$('#btnSave2').on('click', function() {
    art_state = '草稿'
  })
// $('#btnSave2').on('click',function(){
// //formData格式处理数据

// $.ajsx({
//     method:'POST',
//     url:'',
//     data:'',
//     success:function(res){

//     }
// })
// })
// 监听表单的提交事件
$('#form-pub').on('submit',function(e){
    e.preventDefault()
    // 基于form表单，创建formData对象
    var fd = new FormData($(this)[0])
    // var fd = new FormData(this)

    fd.append('state',art_state)
    // 将裁减后的图片输出为一个文件对象
$image.cropper('getCroppedCanvas', {
    // 创建一个 Canvas 画布
    width: 400,
    height: 280
  })
  .toBlob(function(blob) {
    // 将 Canvas 画布上的内容，转化为文件对象
    // 得到文件对象后，进行后续的操作
    // 5. 将文件对象，存储到 fd 中
    fd.append('cover_img', blob)
    // 6. 发起 ajax 数据请求
    publishArticle(fd)
  })



    // fd.forEach(function(v,k){
    //     console.log(v,k);

    // })
})
function publishArticle(fd){
    $.ajax({
        method:'POST',
        url:'/my/article/add',
        data:fd,
        //如果向服务器提交form-data 必须添加以下配置项
        contentType:false,
        processData:false,
        success:function(res){
    if(res.status !== 0){
        return layer.msg("发布文章失败")
    }
    layer.msg('成功')
    location.href = '/article/art_list.html'

        }
    })
    
}
//-------------------
})
// git branch 
//git add .
//git status 
//git commit -m ""
//git status
//git push -u origin article
//git checkout master
//git merge article
//git push 


