/**
 * Created by Administrator on 2017/6/21.
 */
"use strict";
var Hogan = require('hogan.js');
var conf = {
   serverHost : ""
};
var _mm ={
    //网络请求
   requset : function (param) {
       var _this = this;
       $.ajax({
           url:param.url || '',
           type : param.method || 'get',
           dataType : param.type || 'json',
           data : param.data || '',
           success : function (res) {
               //请求成功
               if (0 === res.status) {
                   typeof param.success === 'function' && param.success(res.data, res.msg);
               }
               //没有登录状态，强制登录
               else if (10 === res.status) {
                   _this.doLogin();
               }
               //请求数据错误
               else if (1 == res.status) {
                   typeof param.error === 'function' && param.error(res.msg);
               }
           },
           error  : function (err) {
               typeof param.error==='function'&& param.error(err.statusText)
           }
       });
   },
    //获取服务器地址
    getServerUrl : function (path) {
       return conf.serverHost + path;
    },
    //获取Url地址参数
    getUrl : function (name) {
       var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
       var result = window.location.search.substr(1).match(reg);
       return result ? decodeURIComponent(result[2]) : null;
    },
    //渲染HTML模版,用的hogan
    renderHtml: function (htmlTemplate,data) {
       var template = Hogan.compile(htmlTemplate);
        var result = template.render(data);
            return result;
    },
    //成功提示
    successTips : function (msg) {
        alert(msg || "操作成功")
    },
    //错误提示
    erroTips : function (msg) {
       alert(msg || "哪里不对了~")
    },
    //验证提示，支持非空判断，手机，邮箱
    validata : function (value ,type) {
       //强转value为字符串
         var value = $.trim(value);
         //非空验证
          if('require'=== type){
              return !!value;
          }
          //手机号验证
          if('phone' === type){
              return  /^1\d{10}$/.test(value);
          }
          //邮箱格式验证
        if('email' === type){
              return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value)
        }


    },
        //统一登录处理
    doLogin : function () {
       //从哪跳过去的就返回到哪里，所以要把路径安全优化后参数
         window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
    },
    //回到主页
    goHome : function () {
        window.location.href='./index.html'
    }
};
module.exports = _mm;