/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-16 10:39:41 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-16 17:46:56
 */
var conf={
    serverHost:""
}
var hogan=require('hogan.js');
var mm={
    request : function(param){
        var that=this
        $.ajax({
            type:param.method || 'get',
            url :param.url    || '',
            dataType : param.type || 'json',
            data : param.data || '',
            success :function (res){
                //请求成功
                if(res.status==0){
                    typeof param.success === 'function' && param.success(res.data,res.msg)
                }else if(res.status===10){
                    //需要登录
                    that.doLogin();
                }else if(res.status===1){
                    typeof param.success === 'function' && param.error(res.msg)
                }
            },
            error:function(err){
                typeof param.success === 'function' && param.error(err.statusText);
            }
        })
    },
    //获取服务器地址
    getServerUrl:function(path){
        return conf.serverHost + path;
    },
    //获取搜索内容
    getUrlParam:function(name){
        var reg=new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var result= window.location.search.substr(1).match(reg);
        return result?decodeURIComponent(result[2]):null
    },
    //登录操作
    doLogin:function(){
        window.location.href="./login.html?redirect="+encodeURIComponent(window.location.href);
    },
    //渲染html模板
    renderHTML:function(htmlTel,data){
        var tem=hogan.compile(htmlTel);
        var result=tem.render(data);
        return result;
    },
    //成功提示
    successTips:function(msg){
        console.log(msg||'操作成功');
    },
    //错误提示
    errorTips:function(msg){
        console.log(msg||'有哪里错误了')
    },
    //字段验证，支持是否为空、
    validate:function(value,type){
        var value=$.trim(value);
        //非空验证
        if(type==='require'){
            return !!value;
        }
        //手机验证
        if(type==='phone'){
            return /^1\d{10}$/.test(value);
        }
        //邮箱格式验证
        if(type==='email'){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    //跳回主页
    goHome:function(){
        window.location.href='./index.html';
    }
};
module.exports=mm;