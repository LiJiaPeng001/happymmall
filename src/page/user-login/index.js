/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:56:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-17 14:48:57
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
            pwd  :$.trim($('#password').val())
        };
        //表单验证结果
        var vali = this.formValidate(formData);
        if(vali.status){
            user.login(formData,function(res){
                window.location.href=mm.getUrlParam('redirect') || './index.html'
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
        if(!mm.validate(a.uname,'require')){
            result.msg='用户名不能为空';
            result.status=false;
            return result;
        }
        if(!mm.validate(a.pwd,'require')){
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