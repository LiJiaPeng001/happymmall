require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide= require('page/common/nav-side/index.js');
var mm             = require('util/mm.js');
var user           = require('service/user-service.js');
var templateIndex   = require('./index.string');
//逻辑部分
var page={
    init:function(){
        this.onLoad();
    },
    onLoad:function(){
        navSide.init({
            name:'user-center'
        })
        this.loadUserInfo();
    },
    loadUserInfo:function(){
        var userHtml='';
        user.getUserInfo(function(res){
            userHtml=mm.renderHtml(templateIndex,res);
            $('.panel-body').html(userHtml);
        },function(err){
            mm.errorTips(err);
        })
    }   

}
$(function(){
    page.init();
});