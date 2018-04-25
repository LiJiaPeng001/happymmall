/*
* @Author: Rosen
* @Date:   2017-06-09 09:42:22
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-24 15:42:57
*/

'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _order          = require('service/order-service.js');
var Pagination      = require('util/pagination/index.js');
var templateIndex   = require('./index.string');

// page 逻辑部分
var page = {
    data: {
        listParam : {
            pageNum     : 1,
            pageSize    : 10
        }
    },
    init: function(){
        this.onLoad();
    },
    onLoad : function(){
        this.loadOrderList();
        // 初始化左侧菜单
        navSide.init({
            name: 'order-list'
        });
    },
    // 加载订单列表
    loadOrderList: function(){
        var _this           = this,
            orderListHtml   = '',
            $listCon        = $('.order-list-con');
        $listCon.html('<div class="loading"></div>');
        _order.getOrderList(this.data.listParam, function(res){
            // 渲染html
            orderListHtml = _mm.renderHtml(templateIndex, res);
            $listCon.html(orderListHtml);
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
                var that=$(this);
                if(window.confirm('确认要取消该商品？')){
                    var childOrderNoId = $(this).parent().data().childordernoId;
                    _this.cancelcommodity(childOrderNoId);
                }
            })
            _this.loadPagination({
                hasPreviousPage : res.hasPreviousPage,
                prePage         : res.prePage,
                hasNextPage     : res.hasNextPage,
                nextPage        : res.nextPage,
                pageNum         : res.pageNum,
                pages           : res.pages
            });
        }, function(errMsg){
            $listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
        });
        
    },
    // 加载分页信息
    loadPagination : function(pageInfo){
        var _this = this;
        this.pagination ? '' : (this.pagination = new Pagination());
        this.pagination.render($.extend({}, pageInfo, {
            container : $('.pagination'),
            onSelectPage : function(pageNum){
                _this.data.listParam.pageNum = pageNum;
                _this.loadOrderList();
            }
        }));
    },
    //取消商品
    cancelcommodity : function(childOrderNoId){
        var _this=this;
        _order.cancelcommodity(childOrderNoId,function(res){
            _mm.successTips('成功取消商品');           
            _this.loadOrderList();
        },function(err){
            _mm.errorTips(err);
        })
    }
};
$(function(){
    page.init();
});