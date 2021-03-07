$.ajaxPrefilter(function(options){
    options.url = "http://ajax.frontend.itheima.net" + options.url
//判断是否是需要携带header 的请求
if(options.url.indexOf('/my') !== -1){
    options.headers = {
        Authorization:localStorage.getItem('token')
    }
}

// 拦截阻止未登录就可以查看有权限的内容
//无论请求成功还是失败都会调用complate函数
options.complete= function(res){

if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！")
{
    localStorage.removeItem('token')
    location.href = '/login.html'
}

}



})