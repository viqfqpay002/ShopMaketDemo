/**
 * Created by Administrator on 2017/7/2.
 */
var _mm = require("util/mm.js");
var _user = {
    checkLoginInfo: function (resolve,reject) {
         _mm.requset({
             url:get.getServerUrl("/user/get_user_info.do"),
             method: 'POST',
             success: resolve,
             error: reject
         })

    },
    logout:function (resolve,reject) {
        //登出操作
        _mm.requset({
            url: get.getServerUrl("/user/userout.do"),
            method:'POST',
            success: resolve,
            error: reject
        })
    }
};
module.exports = _user;