require('./index.css')
require('./index.css')
var mm=require('util/mm.js')

var header={
    init:function(){
        this.bindEvent();
    },
    onLoad:function(){
        var keyword=mm.getUrlParam('keyword');
        // keyword存在，回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent:function(){
        var that=this;
        $('#search-btn').click(function(){
            that.searchSubmit();
        });
        // 输入回车后，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode===13){
                that.searchSubmit();
            }
        })
    },
    // 搜索提交
    searchSubmit:function(){
        var keyword=$.trim($('#search-input').val());
        //如果提交时候有keyword，正常跳转到list页
        if(keyword){
            window.location.href='./list.html?keyword='+keyword;
            // 如果为空，跳转到首页
        }else{
            mm.goHome();
        }
    }
}
header.init();