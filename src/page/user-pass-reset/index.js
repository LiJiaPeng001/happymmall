/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:56:58 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-18 09:26:52
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
    data:{
        username:'',
        question:'',
        answer:'',
        token:''
    },
    init:function(){
        this.onload()
        this.bindEvent();
    },
    onload:function(){
        this.loadStepUsername();
    },
    bindEvent:function(){
        var that=this;
        $('#submit-username').click(function(){
            var uname=$.trim($('#username').val());
            //用户名存在
            if(uname){
                user.getQuestion(uname,function(res){
                        that.data.uname=uname;
                        that.data.question=res;
                        that.loadStepQuestion();
                },function(err){
                    formError.show(err);
                })
                //用户名不存在
            }else{
                formError.show('请输入用户名');
            }
        })
        //输入问题后的点击事件
        $('#submit-question').click(function(){
            var an=$.trim($('#answer').val());
            //用户名存在
            if(an){
                //检查密码提示问题答案
                user.checkAnswer({
                    username:that.data.username,
                    question:that.data.question,
                    answer:an
                },function(res){
                    console.log(res);
                        that.data.answer=an;
                        that.data.token=res;
                        that.loadStepPassword();
                },function(err){
                    formError.show(err);
                })
                //用户名不存在
            }else{
                formError.show('请输入用户名');
            }
        })
    //输入新密码后的点击事件
    $('#submit-password').click(function(){
        var pwd=$.trim($('#password').val());
        //密码是否为空
        if(pwd && pwd.length>=6){
            //检查密码提示问题答案
            user.resetPassword({
                username    : that.data.username,
                questionNew : pwd,
                forgetToken : that.data.token
            },function(res){
                window.location.href('./result.html?type=pass-reset');
            },function(err){
                formError.show(err);
            })
            //用户名不存在
        }else{
            formError.show('请输入不少于6位的新密码');
            }
        })
    },
    //加载输入用户名的一步
    loadStepUsername:function(){
        $(".step-username").show();
    },
    //加载输入密码提示问题答案的一步
    loadStepQuestion:function(){
        //清除错误提示
        formError.hide();
        //做容器的切换
        $(".step-username").hide().siblings('.step-question').show().find('.question').text(this.data.question);
    },
    //加载输入password的一步
    loadStepPassword:function(){
        //清除错误提示
        formError.hide();
        //做容器的切换
        $(".step-question").hide().siblings('.step-password').show();
    }
}
$(function(){
    page.init();
});