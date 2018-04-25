/*
* @Author: Rosen
* @Date:   2017-05-23 19:52:16
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-24 09:36:41
*/
'use strict';
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide         = require('page/common/nav-side/index.js');
var _mm             = require('util/mm.js');
var _user           = require('service/user-service.js');
var _address        = require('service/address-service.js')
var templateIndex   = require('./index.string');
var _addressModel   = require('page/order-confirm/address-modal.js')
var templateAddressModal    = require('page/order-confirm/address-modal.string');

// page 逻辑部分
var page = {
    init: function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        // 初始化左侧菜单
        navSide.init({
            name: 'user-center'
        });
        // 加载用户信息
        this.loadUserInfo();
        //加载地址
        this.loadProvinces();
    },
    bindEvent : function(){
        var _this = this;
        // 点击提交按钮后的动作
        $(document).on('click', '.btn-submit', function(){
            var userInfo = {
                phone       : $.trim($('#phone').val()),
                email       : $.trim($('#email').val()),
                question    : $.trim($('#question').val()),
                answer      : $.trim($('#answer').val()),
                province    : $.trim($('#receiver-province option:selected').text()),
                city        : $.trim($('#receiver-city option:selected').text()),
                county      : $.trim($('#receiver-county option:selected').text()),
                areaId      : $.trim($('#receiver-county option:selected').val()),
                areaName    : $.trim($('#receiver-county option:selected').text()),
            },
            validateResult = _this.validateForm(userInfo);
            if(validateResult.status){
                // 更改用户信息
                _user.updateUserInfo(userInfo, function(res, msg){
                    _mm.successTips(msg);
                    window.location.href = './user-center.html';
                }, function(errMsg){
                    _mm.errorTips(errMsg);
                });
            }
            else{
                _mm.errorTips(validateResult.msg);
            }
        });
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
    //加载城市信息
    loadProvinces:function(){
        var that=this;
        _address.getProvinces(function(res){
            var provincesHtml=_addressModel.getSelectOption(res);
            $('#receiver-province').html(provincesHtml);
            // 省份和城市的二级联动
                $('#receiver-province').change(function(){
                    var provin = $(this).val();
                    that.loadCities(provin);
                });
        },function(rej){
            _mm.errorTips(rej);
        })
    },
    //加载城市信息
    loadCities:function(pid){
        var that=this;
        _address.getCities(pid,function(res){
            var provincesHtml=_addressModel.getSelectOption(res);
            $('#receiver-city').html(provincesHtml);
            $('#receiver-city').change(function(){
                var provin = $(this).val();
                that.loadCounties(provin);
            });
        },function(err){
            _mm.errorTips(err);
        })
    },
    //加载县级信息
    loadCounties:function(cid){
        var that=this;
        _address.getCounties(cid,function(res){
            var provincesHtml=_addressModel.getSelectOption(res);
            $('#receiver-county').html(provincesHtml);
        },function(err){
            _mm.errorTips(err);
        })
    },
    // 验证字段信息
    validateForm : function(formData){
        var result = {
            status  : false,
            msg     : ''
        };
        // 验证手机号
        if(!_mm.validate(formData.phone, 'phone')){
            result.msg = '手机号格式不正确';
            return result;
        }
        // 验证邮箱格式
        if(!_mm.validate(formData.email, 'email')){
            result.msg = '邮箱格式不正确';
            return result;
        }
        // 验证密码提示问题是否为空
        if(!_mm.validate(formData.question, 'require')){
            result.msg = '密码提示问题不能为空';
            return result;
        }
        // 验证密码提示问题答案是否为空
        if(!_mm.validate(formData.answer, 'require')){
            result.msg = '密码提示问题答案不能为空';
            return result;
        }
        //验证省份
        if(!formData.province || formData.province==='请选择'){
            result.msg = '省份不能为空';
            return result;
        }
        //验证城市
        if(!formData.city || formData.city==='请选择'){
            result.msg = '城市不能为空';
            return result;
        }
        //验证县级
        if(!formData.county || formData.county==='请选择'){
            result.msg = '县级不能为空';
            return result;
        }
        // 通过验证，返回正确提示
        result.status   = true;
        result.msg      = '验证通过';
        return result;
    },
};
$(function(){
    page.init();
});