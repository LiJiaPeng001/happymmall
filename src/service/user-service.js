var _mm=require('util/mm.js');
var _user={
     //登出
    logout:function(res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/logout.do'),
            method:'POST',
            success: res,
            error:rej
        })
    },
    //检查登录状态
    checkLogin:function(res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/get_user_info.do'),
            method:'POST',
            success: res,
            error:rej
        })
    },
}
module.exports=_user;