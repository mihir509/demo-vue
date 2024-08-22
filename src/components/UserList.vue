<template>
  <div class="table-responsive"> <!-- Add this wrapper to make the table responsive -->
    <table class="table">
      <thead>
        <tr>
          <th>No</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Website</th>
          <th>Company Name</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredPaginatedUsers" :key="user.id">
          <td>{{ user.id }}</td>
          <td class="text-truncate">{{ user.name }}</td>
          <td class="text-truncate">{{ user.email }}</td>
          <td class="text-truncate">{{ user.phone }}</td>
          <td class="text-truncate"><a :href="'http://' + user.website">{{ user.website }}</a></td>
          <td class="text-truncate">{{ user.company.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
 
  <script>
import { mapState, mapGetters } from 'vuex';

export default {
  computed: {
    ...mapState(['currentPage', 'searchFilter', 'users']), // Map 'users' state
    ...mapGetters(['paginatedUsers']),
    filteredPaginatedUsers() {
      if (!this.searchFilter || !this.searchFilter.searchTerm) {
        return this.paginatedUsers;
      }

      const searchTerm = this.searchFilter.searchTerm.toLowerCase();
      const filter = this.searchFilter.selectedFilter;

      let filteredData = this.paginatedUsers;

      if (filter === 'All') {
        filteredData = this.users; // Use 'users' state
      }

      if (!Array.isArray(filteredData)) {
        return [];
      }

      filteredData = filteredData.filter(user => {
        if (filter === 'All') {
          return (
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.phone.toLowerCase().includes(searchTerm) ||
            user.website.toLowerCase().includes(searchTerm) ||
            user.company.name.toLowerCase().includes(searchTerm)
          );
        } else if (filter === 'User') {
          return user.name.toLowerCase().includes(searchTerm) || user.email.toLowerCase().includes(searchTerm);
        } else if (filter === 'Phone') {
          return user.phone.toLowerCase().includes(searchTerm);
        }
      });

      return filteredData.slice(0, this.usersPerPage);
    }
  }
}
</script>

<style scoped>

.table-responsive {
  overflow-x: auto;
}

.table td {
  max-width: 150px; /* Adjust the width as needed */
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

 </style>