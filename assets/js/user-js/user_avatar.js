$(function(){
     // 1.1 获取裁剪区域的 DOM 元素
 var $image = $('#image')
 // 1.2 配置选项
 const options = {
   // 纵横比
   aspectRatio: 1,
   // 指定预览区域
   preview: '.img-preview'
 }

 // 1.3 创建裁剪区域
 $image.cropper(options)

//模拟点击选择文件，弹出选择文件夹框
 $('#uploadBtn').on('click',function(){
     $("#file").click()
 })
 //监听隐藏框的改变时间
 //获取选择的文件
 $('#file').on('change',function(e){
    console.log(e);
     var filelist = e.target.files
   
     if(filelist.length === 0) {
         return layui.layer.msg("请选择图片")
     }
     var file = e.target.files[0]
     console.log(file);
 var imgURL = URL.createObjectURL(file)
 console.log(imgURL);
     $image
        .cropper('destory')
        .attr('src',imgURL)
        .cropper(options)
 })

 //上传头像功能
// $('#confirmBtn').on('click',function(){
//     var dataURL = $image
//       .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
//         width: 100,
//         height: 100
//       })
//       .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
// $.ajax({
//     method:"POST",
//     url:"/my/update/avatar",
//     data:{
//         avatar:dataURL,
//     },
//     success:function(res){
//         if(res.status!==0){
//             return layui.layer.msg("上传头像失败")
//         }
// window.parent.getUerInfo()
//     }
// })
// })
})