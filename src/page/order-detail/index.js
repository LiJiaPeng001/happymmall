/*
* @Author: Rosen
* @Date:   2017-06-09 17:05:08
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-24 15:08:18
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        orderNumber : _mm.getUrlParam('orderNumber')
    },
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
        // 加载detail数据
        this.loadDetail();
    },
    bindEvent : function(){
        var _this = this;
        $(document).on('click', '.order-cancel', function(){
            if(window.confirm('确实要取消该订单？')){
                _order.cancelOrder(_this.data.orderNumber, function(res){
                    _mm.successTips('该订单取消成功');
                    _this.loadDetail();
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
        });
    },
    // 加载订单列表
    loadDetail: function(){
        var _this           = this,
            orderDetailHtml = '',
            $content        = $('.content');
        $content.html('<div class="loading"></div>');
        _order.getOrderDetail(this.data.orderNumber, function(res){
            _this.dataFilter(res);
            // 渲染html
            orderDetailHtml = _mm.renderHtml(templateIndex, res);
            $content.html(orderDetailHtml);
            for(var i=0,len=$('.cell-operation-status').length;i<len;i++){
                if($('.cell-operation-status')[i].dataset.statusId==='0'){
                    $('.cell-operation-status')[i].innerHTML='<span>已取消</span>';
                }else if($('.cell-operation-status')[i].dataset.statusId==='20'){
                    $('.cell-operation-status')[i].innerHTML='<span>已付款</span>';
                }else if($('.cell-operation-status')[i].dataset.statusId==='40'){
                    $('.cell-operation-status')[i].innerHTML='<span>已发货</span>';
                }else if($('.cell-operation-status')[i].dataset.statusId==='50'){
                    $('.cell-operation-status')[i].innerHTML='<span>交易成功</span>';
                }else if($('.cell-operation-status')[i].dataset.statusId==='60'){
                    $('.cell-operation-status')[i].innerHTML='<span>交易关闭</span>';
                }else{
                    $('.cell-operation-status')[i].innerHTML="<a href='javascript:;' id='cell-operation'>取消商品</a>";
                }
        }
            $('.cell-operation a').click(function(){
                if(window.confirm('确认要删除该商品？')){
                    var childOrderNoId = $(this).parent().data().childordernoId;
                    _this.cancelcommodity(childOrderNoId);
                }
            })
        }, function(errMsg){
            $content.html('<p class="err-tip">' + errMsg + '</p>');
        });
    },
    // 数据的适配
    dataFilter : function(data){
        data.needPay        = data.status == 10;
        data.isCancelable   = data.status == 10;
    },
    //取消商品
    cancelcommodity : function(childOrderNoId){
        _order.cancelcommodity(childOrderNoId,function(res){
            page.init();
            _mm.successTips('删除商品成功');
        },function(err){
            _mm.errorTips(err);
        })
    }
};
$(function(){
    page.init();
});