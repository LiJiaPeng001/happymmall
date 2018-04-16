/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-16 16:50:35 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-16 18:03:30
 */
require('./index.css')
var mm=require('util/mm.js')
var templateIndex=require('./index.string')
//导航
var nav_side={
    option:{
        name:"",
        navList:[
            {name:'user-center',desc:'个人中心',href:'./user-center.html'},
            {name:'order-list',desc:'我的订单',href:'./order-List.html'},
            {name:'pass-update',desc:'修改密码',href:'./pass-update.html'},
            {name:'about',desc:'关于MMall',href:'./about.html'}
        ],
    },
    init : function(option){
        // 合并选项
        $.extend(this.option,option);
        this.renderNav();
    },
    // 渲染导航菜单
    renderNav:function(){
        //计算active数据
        for(var i=0,l=this.option.navList.length;i<l;i++){
            if(this.option.navList[i].name===this.option.name){
                this.option.navList[i].isActive=true;
            }
        }
        var navHtml=mm.renderHTML(templateIndex,{
            navList:this.option.navList
        })
        $('.nav-side').html(navHtml)
    }
}
module.exports = nav_side;