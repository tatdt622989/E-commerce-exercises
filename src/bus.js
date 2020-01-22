import Vue from 'vue';

// 在vue當中寫入新的原型
// 自定義名稱 'messsage:push'
// message: 傳入參數
// status: 樣式，預設值為 warning
// eventbus可以讓元件之間平行的傳遞事件，在這裡是接收Product傳來的事件
Vue.prototype.$bus = new Vue();
