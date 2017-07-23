/**
 * Created by Administrator on 2017/6/25.
 */
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user_service.js');
var _cart = require('service/cart-service.js');
//导航显示
var nav = {
    init: function () {
      this.bindEvent();
      this.loadUserInfo();
      this.loadCartCount();
      return this
    },
    bindEvent: function () {
       //登录点击事件
        $(".js-login").click(function () {
            _mm.doLogin();
        });
        //注册点击事件
        $(".js-register").click(function () {
            window.location.href="./register.html"
        });
        //退出点击事件
        $(".js-loginout").click(function () {
            _user.logout(function (res) {
                window.location.reload()
            },function (errMsg) {
                _mm.erroTips(errMsg)
            })

        })

    },
    // 加载用户信息
    loadUserInfo: function () {
        _user.checkLoginInfo(function (res) {
            $(".user .not-login").hide().siblings().show().find(".username").text(res.username)

        },function (errMsg) {
            //donothing

        })

    },
    loadCartCount: function () {
        _cart.getCartCount(function (res) {
           $(".nav .cart-cont").text(res || 0)

        },function (errMsg) {
            $(".nav .cart-cont").text(0)

        })
    }



};
module.exports = nav.init();
