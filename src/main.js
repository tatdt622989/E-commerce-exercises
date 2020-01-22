// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// npm套件
import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import 'bootstrap';
// 自定義內容
import App from './App';
import router from './router';
import './bus';

axios.defaults.withCredentials = true;

Vue.use(VueAxios, axios);

Vue.component('Loading', Loading);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});

// 路由守衛 to:目標路由 from:當前路由 next:放行前往目標路由
router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.requiresAuth) {
    console.log('需要驗證才能前往');
    const api = `${process.env.APIPATH}/api/user/check`;
    axios.post(api).then((response) => {
      console.log(response.data.success);
      // success的驗證狀態是存在伺服器的，只要還是登入狀態就會回傳true
      if (response.data.success) {
        next();
      } else {
        next({
          path: '/login',
        });
      }
    });
  } else {
    next();
  }
});
