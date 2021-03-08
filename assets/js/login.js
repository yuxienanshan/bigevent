$(function(){
var form = layui.form
var layer = layui.layer
//给 link_reg 注册点击事件
$('#link_reg').on('click',function(){
//登录盒子隐藏 注册盒子显示
$('.login-box').hide()
$(".reg-box").show()
})
$('#link_login').on('click',function(){
    //登录盒子隐藏 注册盒子显示
    $('.reg-box').hide()
    $(".login-box").show()
})
//表单---验证 提交 获取 展示
form.verify({
pwd:[/^[\S]{6,12}$/,'密码须6到12位，且不能有空格'],
repwd:function(value){
var firstPwd = $('#firstPwd').val()
if(firstPwd !== value){
    return '两次密码不一致，请重新输入'
}
}
})
//监听注册表单的提交 -- 阻止默认提交行为 ajax 请求
$('#form_reg').on('submit',function(e){
e.preventDefault()
var datas = {
    username: $('#form_reg [name=username]').val(),
    password: $('#form_reg [name=password]').val()
}
$.ajax({
    method:'POST',
    url:"/api/reguser",
    data:datas,
    success:function(res){
        console.log(res);
        if(res.status !== 0){return layer.msg('注册失败'+ res.message)}
        layer.msg('注册成功，即将跳转登录页面')
        $('#link_login').click()
    }
})
})
//蒋婷登录表单的提交 
$('#form_login').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/api/login',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0){return layer.msg('登录失败')}
        layer.msg('登录成功，即将跳转首页')
        localStorage.setItem('token',res.token)
        location.href = '/index.html'
        }
    })
})
    














    //------------------------------
})