<template>
  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  tabindex="-1"
          @click.prevent="$emit('getpage', pagination.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        <li class="page-item"
        :class="{'active':pagination.current_page === page}"
        v-for="page in pagination.total_pages" :key="page">
        <a class="page-link" href="#" @click.prevent="$emit('getpage', page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next"  tabindex="-1"
          @click.prevent="$emit('getpage', pagination.current_page + 1)">
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  // 從父元件Products傳進來的資料
  props: ['pagination'],
};
</script>
