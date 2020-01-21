<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      />
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#" @click.prevent="logOut">Sign out</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      const api = `${process.env.APIPATH}/logout`;
      const vm = this;
      // eslint-disable-next-line no-console
      console.log(api);
      // 回傳使用者訊息與資料庫比對
      this.$http.post(api, vm.user).then((response) => {
        // eslint-disable-next-line no-console
        console.log(response.data);
        if (response.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>
