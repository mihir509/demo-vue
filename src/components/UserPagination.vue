<template>
     <div class="pagination">
      <ul class="pagination">
        <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
          <button class="page-link" @click="prevPage">Prev</button>
        </li>
        <li class="page-item disabled">
          <span class="page-link">{{ currentPage }} / {{ totalPages }}</span>
        </li>
        <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
          <button class="page-link" @click="nextPage">Next</button>
        </li>
      </ul>
  </div>
  </template>
  
  <script>
  import { mapState, mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['currentPage']),
      ...mapGetters(['totalPages'])
    },
    methods: {
      prevPage() {
        if (this.currentPage > 1) {
          this.$store.commit('SET_CURRENT_PAGE', this.currentPage - 1);
        }
      },
      nextPage() {
        if (this.currentPage < this.totalPages) {
          this.$store.commit('SET_CURRENT_PAGE', this.currentPage + 1);
        }
      }
    }
  }
  </script>