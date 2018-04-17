/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:56:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-17 16:06:50
 */
require('./index.css');
require('page/common/nav-simple/index.js')
var user=require('service/user-service.js')
var mm=require('util/mm.js');
//表单的错误提示
var formError={
    show:function(err){
        $(".error-item").show().find('.err-msg').text(err);
    },
    hide:function(err){
        $(".error-item").hide().find('.err-msg').text('');
    },
}
//逻辑部分
var page={
    init:function(){
        this.bindEvent();
    },
    bindEvent:function(){
        var that=this;
        //验证uname
        $("#username").blur(function(){
            var uname=$.trim($(this).val());
            //如果用户名为空，不做验证
            if(!uname){
                return;
            }
            //异步验证用户名是否存在
            user.checkUserName(uname,function(res){
                formError.hide();
            },function(err){
                formError.show(err);
            })
        })
        //提交注册
        $("#submit").click(function(){
            that.submit();
        });
        $('.suer-content').keyup(function(e){
            //快车键
            if(e.keyCode===13){
                that.submit();
            }
        })
    },
    //提交表单
    submit:function(){
        var formData={
            uname:$.trim($('#username').val()),
            pwd  :$.trim($('#password').val()),
            pwdConfirm  :$.trim($('#password-confirm').val()),
            phone  :$.trim($('#phone').val()),
            email  :$.trim($('#email').val()),
            question  :$.trim($('#question').val()),
            answer  :$.trim($('#answer').val()),
        };
        //表单验证结果
        var vali = this.formValidate(formData);
        if(vali.status){
            user.register(formData,function(res){
                window.location.href='./result.html?type=register'
            },function(err){
                formError.show(err);
            });
        }else{
            //验证失败
            formError.show(vali.msg);
        }
    },
    formValidate:function(a){
        var result = {
            status:false,
            mas : ''
        }
        //验证用户名不能为空
        if(!mm.validate(a.uname,'require')){
            result.msg='用户名不能为空';
            result.status=false;
            return result;
        }
        //验证密码不能为空
        if(!mm.validate(a.pwd,'require')){
            result.msg='密码不能为空';
            result.status=false;
            return result;
        }
        //验证密码不能为六位
        if(a.pwd.length<6){
            result.msg='长度不能少于6位';
            result.status=false;
            return result;
        }
        //验证两次输入的密码是否一致
        if(a.pwd!==a.pwdConfirm){
            result.msg='两次密码不一致';
            result.status=false;
            return result;
        }
        //验证手机号
        if(!mm.validate(a.phone,'phone')){
            result.msg='手机号格式不准确';
            result.status=false;
            return result;
        }
        //验证邮箱
        if(!mm.validate(a.email,'email')){
            result.msg='邮箱格式错误';
            result.status=false;
            return result;
        }
        //验证密码提示问题是否为空
        if(!mm.validate(a.question,'require')){
            result.msg='提示问题不能为空';
            result.status=false;
            return result;
        }
        //验证答案是否为空
        if(!mm.validate(a.answer,'require')){
            result.msg='密码不能为空';
            result.status=false;
            return result;
        }
        result.status=true;
        result.msg='验证通过';
        return result;
    }
}
$(function(){
    page.init();
});