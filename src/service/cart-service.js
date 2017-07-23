/**
 * Created by Administrator on 2017/7/2.
 */
var _mm = require("util/mm.js");
var _cart = {
    getCartCount: function (resolve, reject) {
        //获取购物车数量
        _mm.requset({
            url: get.getServerUrl("/cart/get_cart_product_count.do"),
            method: 'POST',
            success: resolve,
            error: reject
        })
    }
};
module.exports=_cart;