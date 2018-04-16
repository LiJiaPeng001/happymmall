require('./index.css')
var mm=require('util/mm.js')
var user=require('service/user-service.js')
var cart=require('service/cart-service.js')
//导航
var nav={
    init : function(){
        this.bindEvent();
        this.loadCartCount();
        this.loadUserInfo();
        return this;
    },
    bindEvent : function(){
        //登录点击事件
        $('.js-login').click(function(){
            mm.doLogin();
        })
        $('.js-register').click(function(){
            window.location.href='./register.html';
        })
        //退出事件
        $('.js-logout').click(function(){
            user.logout(function(res){
                window.location.reload();
            },function(err){
                mm.errorTips(err);
            });
        })
    },
    //加载用户信息
    loadUserInfo : function(){
        user.checkLogin(function(res){
            $('.user .not-login').hide().siblings('.user .login').show().find('.username').text(res.username);
        },function(err){
            mm.errorTips(err);
        });
    },
    //加载购物车数量
    loadCartCount : function(){
        cart.getCartCount(function(res){
            $('.nav .cart-count').text(res || 0);
        },function(err){
            $('.nav .cart-count').text(0);
        });
    }
}
module.exports = nav.init();