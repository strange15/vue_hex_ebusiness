<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" :class="{ 'disabled': !pagination.has_pre }">
        <a
          class="page-link"
          href="#"
          aria-label="Previous"
          @click.prevent="getProducts(pagination.current_page-1)"
        >
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li
        class="page-item"
        v-for="page in pagination.total_pages"
        :key="page"
        :class="{ 'active': page === pagination.current_page }"
      >
        <a class="page-link" href="#" @click.prevent="getProducts(page)">{{ page }}</a>
      </li>
      <li class="page-item" :class="{ 'disabled': !pagination.has_next }">
        <a
          class="page-link"
          href="#"
          aria-label="Next"
          @click.prevent="getProducts(pagination.current_page+1)"
        >
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Pagination",
   props: {
    pagination: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      // pagination: {}
    };
  },
  methods: {
    getProducts(page) {
      this.$emit("getProducts", page);
    }
  },
  created() {
    const vm = this;
    // vm.$bus.$on("pagination:set", pagination => {
    //   vm.pagination = pagination;
    // });
  }
};
</script>

<style scope>
</style>