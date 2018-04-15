/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-04-15 14:52:42 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-15 18:00:33
 */
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
        "common" : ["./src/page/common/common.js"],
        "index" : ["./src/page/index/index.js"],
        "login" : ["./src/page/login/login.js"]
    },
    output:{
        path:"./dist",
        filename:"js/[name].js"
    },
    module: {
        loaders: [
          { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
          { test: /\.(gif|png|jpg)\??.*$/, loader: "url-loader?limit=100&name=res/[name].[ext]" }
        ]
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
module.exports = configs
