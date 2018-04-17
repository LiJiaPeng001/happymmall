require('./index.css')
require('page/common/nav-simple/index.js')
var mm=require('util/mm.js');

$(function(){
    var type = mm.getUrlParam('type') || 'default';
    var $element=$('.'+type+'-success');
    $element.show();

    //显示对应的详情商品
})