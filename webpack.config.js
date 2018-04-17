/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:52:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-17 10:45:22
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

//环境变量的配置  dev-online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'online';
console.log(WEBPACK_ENV);

//获取html-webpack-plugins
var getHtml = function (name,title) {
    return {
            title:title,                                    //设置生成的 html 文件的标题。
            template : "./src/view/"+name+".html",          //根据自己的指定的模板文件来生成特定的 html 文件。这里的模板类型可以是任意你喜欢的模板，可                                                  以是 html, jade, ejs, hbs, 等等，但是要注意的是，使用自定义的模板文件时，需要提前安装对                                                     应的 loader， 否则webpack不能正确解析。
            filename : "view/"+name+".html",                //生成 html 文件的文件名。默认为 index.html.
            inject   : true,                                //script标签位于html文件的 body 底部
            hash     : true,                                //hash选项的作用是 给生成的 js 文件一个独特的 hash 值
            chunks   : ['common',name]                      //chunks 选项的作用主要是针对多入口(entry)文件。当你有多个入口文件的时候，对应就会生成多                                                    个编译后的 js 文件。那么 chunks 选项就可以决定是否都使用这些生成的 js 文件。
    }
}
var configs = {
    entry:{
        "common" : ["./src/page/common/common.js",],
        "index" : ["./src/page/index/index.js"],
        "login" : ["./src/page/login/login.js"],
        "result" : ["./src/page/result/index.js"]
    },
    output:{
        path:"./dist",
        publicPath:"/dist",
        filename:"js/[name].js"
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: "url-loader?limit=100&name=../res/[name].[ext]" },
          { test: /\.string$/, loader: "html-loader" }
        ]
      },
    resolve:{
        alias:{
            node_modules:__dirname+'/node_modules',
            util:__dirname+'/src/util',
            page:__dirname+'/src/page',
            service:__dirname+'/src/service',
            image:__dirname+'/src/image',
        }
    },
    plugins: [
        //独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : "common",
            filename : "js/base.js"
        }),
        //css独立打包
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin( getHtml('index','首页')  ),
        new HtmlWebpackPlugin( getHtml('login','用户登录')  ),
        new HtmlWebpackPlugin( getHtml('result','操作结果')  )
    ]
}
if("dev" === WEBPACK_ENV){
    configs.entry.common.push("webpack-dev-server/client?http://localhost:8088/");
}
module.exports = configs
