/*
* @Author: Rosen
* @Date:   2017-06-07 10:30:06
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 17:03:34
*/

'use strict';
var _mm = require('util/mm.js');

var _address = {
    // 获取地址列表
    getAddressList : function(resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/list.do'),
            data    : {
                pageSize : 50
            },
            success : resolve,
            error   : reject
        });
    },
    // 新建收件人
    save : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/add.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 更新收件人
    update : function(addressInfo, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/update.do'),
            data    : addressInfo,
            success : resolve,
            error   : reject
        });
    },
    // 删除收件人
    deleteAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/del.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    // 获取单条收件人信息
    getAddress : function(shippingId, resolve, reject){
        _mm.request({
            url     : _mm.getServerUrl('/shipping/select.do'),
            data    : {
                shippingId : shippingId
            },
            success : resolve,
            error   : reject
        });
    },
    //获取省信息
    getProvinces : function(res,rej){
        _mm.request({
            url : _mm.getServerUrl('/manage/area/provinceQuery.do'),
            success:res,
            error:rej
        })
    },
    //获取城市信息
    getCities : function(pid,res,rej){
        _mm.request({
            url : _mm.getServerUrl('/manage/area/provinceCity.do'),
            data:{
                provinceId:pid 
            },
            success:res,
            error:rej
        })
    },
    //获取县级信息
    getCounties:function(cid,res,rej){
        _mm.request({
            url : _mm.getServerUrl('/manage/area/provinceCounty.do'),
            data:{
                cityId:cid 
            },
            success:res,
            error:rej
        })
    }
}
module.exports = _address;