<template>
  <div>
    <loading :active.sync="isLoading"></loading>
    <div class="text-right">
      <button class="btn btn-primary" @click="openModal('set')">建立產品</button>
    </div>
    <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <!-- 使用eslint必須加上key屬性 -->
      <tr v-for="(item) in products" :key="item.id">
        <td>{{ item.category }}</td>
        <td>{{ item.title }}</td>
        <td class="text-right">
          {{ item.origin_price | currency}}
        </td>
        <td class="text-right">
          {{ item.price | currency}}
        </td>
        <td>
          <span v-if="item.is_enabled==1" class="text-success">啟用</span>
          <span v-else class="text-danger">未啟用</span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm" data-toggle="modal"
          data-target="#editModal" @click="openModal('edit', item)">編輯</button>
          <button class="btn btn-outline-danger btn-sm" data-toggle="modal"
          data-target="#delProductModal" @click="openModal('delete', item)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- @getpage="getProducts"是讓子元件Pagination可以使用父元件的方法 -->
  <!-- :pagination="pagination"是把父元件的pagination資料傳入子元件 -->
  <Pagination :pagination="pagination" @getpage="getProducts"></Pagination>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="form-group">
                <label for="image">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                  placeholder="請輸入圖片連結">
              </div>
              <div class="form-group">
                <label for="customFile">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                  ref="files" @change="uploadFile">
              </div>
              <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
                class="img-fluid" alt="" :src="tempProduct.imageUrl">
            </div>
            <div class="col-sm-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                @blur="isBlur = true"
                :class="checkInput('title')"
                v-model="tempProduct.title"
                  placeholder="請輸入標題">
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category"
                    v-model="tempProduct.category"
                    placeholder="請輸入分類">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">單位</label>
                  <input type="unit" class="form-control" id="unit"
                    v-model="tempProduct.unit"
                    placeholder="請輸入單位">
                </div>
              </div>

              <div class="form-row">
                <div class="form-group col-md-6">
                <label for="origin_price">原價</label>
                  <input type="number" class="form-control" id="origin_price"
                    @blur="isBlur = true"
                    :class="checkInput('origin_price')"
                    v-model="tempProduct.origin_price"
                    placeholder="請輸入原價">
                </div>
                <div class="form-group col-md-6">
                  <label for="price">售價</label>
                  <input type="number" class="form-control" id="price"
                    @blur="isBlur = true"
                    :class="checkInput('price')"
                    v-model="tempProduct.price"
                    placeholder="請輸入售價">
                </div>
              </div>
              <hr>

              <div class="form-group">
                <label for="description">產品描述</label>
                <textarea type="text" class="form-control" id="description"
                  v-model="tempProduct.description"
                  placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="form-group">
                <label for="content">說明內容</label>
                <textarea type="text" class="form-control" id="content"
                  v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"></textarea>
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                    v-model="tempProduct.is_enabled"
                    :true_value="1"
                    :false_value="0"
                    id="is_enabled">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"
          @click="delKey=false">取消</button>
          <button type="button" class="btn btn-danger" @click="updateProduct()"
            >確認刪除</button>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
// 元件內引入jquery
import $ from 'jquery';

import Pagination from '../Pagination';

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      openModalMethod: '',
      isLoading: false,
      status: {
        fileUploading: false,
      },
      isVerified: [],
      isBlur: '',
    };
  },
  components: {
    Pagination,
  },
  methods: {
    // 取得商品列表(管理員用)
    // page = 1 是es6的參數預設值，當函式沒有代參數進去時，會自動代1進去
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/products?page=${page}`;
      const vm = this;
      vm.isLoading = true;
      this.$http.get(api).then((response) => {
        console.log(response.data);
        vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
      });
    },
    openModal(openModalMethod, item) {
      const vm = this;
      this.isBlur = false;
      if (openModalMethod === 'set') {
        vm.tempProduct = {};
        vm.openModalMethod = 'set';
      } else if (openModalMethod === 'edit') {
        // 編輯時因為物件傳參考特性，所以如果直接使用 item 會導致在還沒確認修改前，就直接修改到原始資料
        // 所以使用 Object.assign({}, item);的方法來建立一個不會傳參考的新物件
        vm.tempProduct = Object.assign({}, item);
        vm.openModalMethod = 'edit';
      } else {
        // 刪除時，不用加 Object.assign({}, item);，因為物件會直接被刪掉，所以傳參考並不影響
        vm.tempProduct = item;
        vm.openModalMethod = 'delete';
      }
      if (openModalMethod !== 'delete') {
        $('#productModal').modal('show');
      }
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      const verified = this.checkForm();
      if (vm.openModalMethod !== 'delete' && !verified) {
        this.$bus.$emit('message:push', '請填寫必填欄位', 'danger');
        this.isBlur = true;
        return;
      }
      // 如果點選的是編輯按鈕，則使用put的http方法
      if (vm.openModalMethod !== 'set') {
        api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
      }
      if (vm.openModalMethod === 'edit') {
        httpMethod = 'put';
      } else if (vm.openModalMethod === 'delete') {
        httpMethod = 'delete';
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data);
        let modal = '#productModal';
        if (!response.data.success) {
          this.$bus.$emit('message:push', '資料回傳失敗', 'danger');
        } else {
          this.$bus.$emit('message:push', '成功', 'success');
        }
        if (vm.openModalMethod === 'delete') {
          modal = '#delProductModal';
        }
        $(modal).modal('hide');
        vm.getProducts();
        vm.products = response.data.products;
      });
    },
    uploadFile() {
      const uploadedFile = this.$refs.files.files[0];
      console.log(uploadedFile);
      const vm = this;
      vm.status.fileUploading = true;
      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile);
      const url = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/admin/upload`;
      this.$http.post(url, formData, {
        header: 'multipart/form-data',
      }).then((response) => {
        console.log(response.data);
        vm.status.fileUploading = false;
        if (response.data.success) {
          // 強制動態寫入資料
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl);
          this.$bus.$emit('message:push', '上傳成功', 'success');
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger');
        }
        console.log(vm.tempProduct);
      });
    },
    checkInput(item) {
      if (this.tempProduct[item] && this.isBlur) {
        return 'is-valid';
      } else if (this.isBlur) {
        return 'is-invalid';
      }
      return '';
    },
    checkForm() {
      let i = 0;
      while (this.isVerified.length > i) {
        if (!this.isVerified[i]) {
          return false;
        }
        i += 1;
      }
      return true;
    },
  },
  watch: {
    tempProduct: {
      handler() {
        this.isVerified = [!!this.tempProduct.title,
          !!this.tempProduct.origin_price,
          !!this.tempProduct.price];
      },
      deep: true,
    },
  },
  // 在created階段時，執行函式
  created() {
    this.getProducts();
  },
};
</script>
