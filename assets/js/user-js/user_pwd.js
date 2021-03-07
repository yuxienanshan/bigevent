//定义校规则
$(function(){
var form = layui.form 
form.verify({
pwd:[/^[\S]{6,12}$/,'密码6-12位，中间不能有空格'],
newpwd:function(value){
    if(value === $('#oldpwd').val()) {
        return "新密码不能与旧密码相同"
    }
},
repwd:function(value){
    if(value !== $('#newpwd').val()) {
        return "两次输入密码不一致"
    }
}

})
//监听表单的提交行为
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        method:'POST',
        url:'/my/updatepwd',
        data:$(this).serialize(),
        success:function(res){
            if(res.status !== 0 ){
                return layui.layer.msg('更新密码失败')
            }
            // layui.layer.msg('更新密码成功')
            $('.layui-form')[0].reset()
            layui.layer.alert("更新密码成功，请重新登录",function(index){
 localStorage.removeItem('token')
 window.parent.location.href = "/login.html"
            })


        }
    })
})

})