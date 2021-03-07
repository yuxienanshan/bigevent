//发送ajax请求用户的基本信息
$(function(){
    
    getUserInfo()
//实现退出功能
$('#logoutBtn').on('click',function(){
layui.layer.confirm('确定要离开吗？',{icon:3,title:'退出提示'},function(index){
    //清空本地存储的token
    localStorage.removeItem('token')
    //跳转登录页面
    location.href = "/login.html"
    //取消后不做任何操作
    layui.layer.close(index)
})


})





})

function getUserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
       success:function(res){
           console.log(res);
            //判断是否请求成功，弹出提示信息
if(res.status !== 0) { return layui.layer.msg('获取用户信息失败')}
layui.layer.msg('登录成功')
  renderAvatar(res.data)
}
    })
}
//封装渲染用户信息和头像的函数
function renderAvatar(user){
    //昵称的优先级大于名字，有昵称就先渲染
    var name = user.pickname || user.username
    $("#welcome").html('welcome' + name)
    //头像优先级大于文本，如果有头像先渲染
    if(user.user_pic !== null){
    $('.layui-nav-img').attr('src',user.user_pic).show()
    $('.text-avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        var fistletter = name[0].toUpperCase()
        $('.text-avatar').html(fistletter).show()
    }
}
