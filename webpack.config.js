/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:52:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-16 17:36:34
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')

//环境变量的配置  dev-online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'online';
console.log(WEBPACK_ENV);

//获取html-webpack-plugins
var getHtml = function (name) {
    return {
        template : "./src/view/"+name+".html",
            filename : "view/"+name+".html",
            inject   : true,
            hash     : true,
            chunks   : ['common',name]
    }
}
var configs = {
    entry:{
        "common" : ["./src/page/common/common.js",],
        "index" : ["./src/page/index/index.js"],
        "login" : ["./src/page/login/login.js"]
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
        new HtmlWebpackPlugin( getHtml('index')  ),
        new HtmlWebpackPlugin( getHtml('login')  ),
    ]
}
if("dev" === WEBPACK_ENV){
    config.entry.common.push("webpack-dev-server/client?http://localhost:8088/");
}
module.exports = configs
