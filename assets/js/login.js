$(function(){
//给登录链接注册点击事件
$('#link_si').on('click',function(){

$('.regbox').hide()
$('.loginbox').show()

})//------
//给注册账号链接注册点击事件
$('#link_su').on('click',function(){
    $('.loginbox').hide()
    $('.regbox').show()
    })//-------

//自定义校验规则
layui.form.verify({
 psd: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ] ,
    repsd: function(value, item){ //value：表单的值、item：表单的DOM对象
        var psd = $('#psd').val()
          if(value != psd) {
              return "两次输入密码不一致"
          }
      }
      
      
  });      
  //监听注册表单的提价事件
  $('#register').on('submit',function(e){
  e.preventDefault()
  var data = {username:$('#register [name=username]').val(),
password:$('#register [name=password]').val()
}
  $.post('/api/reguser',data,function(res){
      if(res.status !== 0) {
          return layui.layer.msg(res.message)
      }
      layui.layer.msg('注册成功')
      $('#link_si').click()
  })
  })
  //监听登录表单的提交行为
  $('#login').on('submit',function(e){
      e.preventDefault()
      $.ajax({
          url:"/api/login",
          method:"POST",
          data: $(this).serialize(),
          success: function (res) {
            if(res.status !== 0) {
               
                return layui.layer.msg(res.message)
            }
           
            layui.layer.msg('登录成功')
            //将返回的token 存入到当前域名下的localstorage中
            localStorage.setItem('token',res.token)
            //成功后跳转首页
            location.href="/index.html"

          }
      });
  })





//------------------------ 
})