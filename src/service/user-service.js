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
    //用户登录
    login:function(userInfo,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/login.do'),
            data : userInfo,
            method:'POST',
            success: res,
            error:rej
        })
    },
    //用户登录
    checkUserName:function(uname,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/check_valid.do'),
            data : {
                type:'username',
                str:uname
            },
            method:'POST',
            success: res,
            error:rej
        })
    },
    //用户注册
    register:function(uInfo,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/register.do'),
            data : uInfo,
            method:'POST',
            success: res,
            error:rej
        })
    },
    //获取用户密码提示问题
    getQuestion:function(uname,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/forget_get_question.do'),
            data : {
                username:uname
            },
            method:'POST',
            success: res,
            error:rej
        })
    },
    //检查密码提示问题答案
    checkAnswer:function(uInfo,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/forget_check_answer.do'),
            data : uInfo,
            method:'POST',
            success: res,
            error:rej
        })
    },
    //检查密码提示问题答案
    resetPassword:function(uInfo,res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/forget_reset_password.do'),
            data : uInfo,
            method:'POST',
            success: res,
            error:rej
        })
    },
    //获取用户信息
    getUserInfo:function(res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/get_information.do'),
            method:'POST',
            success: res,
            error:rej
        })
    },
    //更新个人信息
    updateUserInfo:function(res,rej){
        _mm.request({
            url:_mm.getServerUrl('/user/update_information.do'),
            method:'POST',
            success: res,
            error:rej
        })
    }
}
module.exports=_user;