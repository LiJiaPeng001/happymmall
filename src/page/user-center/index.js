/*
* @Author: Rosen
* @Date:   2017-05-23 19:33:33
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-23 10:03:31
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
require('page/order-confirm/index.js')
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var templateIndex   = require('./index.string');
var _address        = require('service/address-service.js');
var orderConfirm    = require('page/order-confirm/index.js');


// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
    },
    // 加载用户信息
    loadUserInfo : function(){
        var userHtml = '';
        _user.getUserInfo(function(res){
            var len=res.answer.length;
            res.answer='';
            for(var i=0;i<len;i++){
                res.answer+='*'
            }
            userHtml = _mm.renderHtml(templateIndex, res);
            $('.panel-body').html(userHtml);
        }, function(errMsg){
            _mm.errorTips(errMsg);
        });
    },
    //加载地址
    loadAddress:function(){
        orderConfirm
    }
};
$(function(){
    page.init();
});