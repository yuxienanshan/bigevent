$(function(){
    initUserInfo()
//设置验证guize

layui.form.verify({
nickname:function(value){
    if(value.length >6){
        return "昵称长度需要在1-6个字符之间"
    }
}
})

//给重置按钮注册事件
$('#resetBtn').on('click',function(e){
e.preventDefault()
initUserInfo()

})
//监听用户信息修改表单的提交事件
$('.layui-form').on('submit',function(e){
    e.preventDefault()
$.ajax({
    method:"POST",
    url:"/my/userinfo",
    data:$(this).serialize(),
    success:function(res){
        if(res.status !== 0){
            return layui.layer.msg("修改信息提交失败")
        }
        layui.layer.msg("提交修改成功")
       window.parent.getUserInfo()
    }
})
})





})
//获取用户信息，并且在form表单中呈现
function initUserInfo(){
    $.ajax({
method:"GET",
url:"/my/userinfo",
success:function(res){
    console.log(res);
    if(res.status !== 0) {
        return layui.layer.msg("获取用户信息失败")
    }
    layui.form.val("formUserInfo",res.data)
}

    })
}