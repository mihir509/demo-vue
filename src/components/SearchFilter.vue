<template>
  <div class="row g-2">
    <div class="col-sm-6">
      <input type="text" class="form-control" v-model="searchTerm" @input="updateFilter" placeholder="Search..." />
    </div>
    <div class="col-sm-6">
      <select class="form-select" v-model="selectedFilter" @change="updateFilter">
        <option value="All">All</option>
        <option value="User">User</option>
        <option value="Phone">Phone</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchTerm: '',
      selectedFilter: 'All'
    };
  },
  methods: {
    updateFilter() {
      this.$emit('filterChanged', {
        searchTerm: this.searchTerm,
        selectedFilter: this.selectedFilter
      });
    }
  }
};
</script>
