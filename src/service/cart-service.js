/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-16 16:01:45 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-16 16:04:24
 */
var _mm=require('util/mm.js');
var _cart={
     //获取购物车数量
    getCartCount:function(res,rej){
        _mm.request({
            url:_mm.getServerUrl('/cart/get_cart_product_count.do'),
            success: res,
            error:rej
        })
    }
}
module.exports=_cart;