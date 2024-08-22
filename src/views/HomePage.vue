<template>
  <div id="app">
    <div class="d-flex">
      <!-- Sidebar -->
      <nav id="sidebar" class="bg-light" :class="{ 'active': isSidebarActive }">
        <div class="sidebar-header">
          <h3>Admin Logo</h3>
        </div>
        <ul class="list-unstyled components">
          <li class="active"><a href="#">Users</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>

      <!-- Page Content -->
      <div id="content" class="container-fluid" :class="{ 'active': isSidebarActive }">
        <button type="button" id="sidebarCollapse" class="btn btn-info mb-3 d-md-none" @click="toggleSidebar">
          ☰
        </button>
        <div class="container">
          <div class="d-flex justify-content-between align-items-center">
            <SearchFilter @filterChanged="updateFilter" />
            <!-- <RouterLink to="/form"><button class="btn-primary">Add User</button></RouterLink> -->
          </div>
          <div class="my-3">
            <UserList :users="filteredUsers" />
          </div>
          <div class="d-flex justify-content-end align-items-center">
            <UserPagination :currentPage="currentPage" :totalPages="totalPages" @pageChanged="updatePage" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import SearchFilter from '@/components/SearchFilter.vue';
import UserList from '@/components/UserList.vue';
import UserPagination from '@/components/UserPagination.vue'
export default {
    name:'HomePage',
    components: {
        SearchFilter,
        UserList,
        UserPagination
    },
    data (){
      return {
        isSidebarActive: false // Sidebar state
      }

    },
    computed: {
  ...mapState(['users', 'currentPage', 'totalPages', 'searchFilter']),
  filteredUsers() {
    if (!this.searchFilter) {
      return [];
    }
    const searchTerm = this.searchFilter.searchTerm.toLowerCase();
    const filter = this.searchFilter.selectedFilter;

    return this.users.filter(user => {
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
  }
},
    methods: {
        updatePage(page) {
            this.$store.dispatch('updatePage', page);
        },
        updateFilter(filter) {
            this.$store.dispatch('updateFilter', filter);
        },
        toggleSidebar() {
          this.isSidebarActive = !this.isSidebarActive;
        }

    },
    created() {
        this.$store.dispatch('fetchUsers');
    }
}
</script>


<style scoped>
li.active a {
  background-color: #b3c8e0; /* Background color for active item */
  color: white;              /* Text color for active item */
  font-weight: bold;         /* Make text bold */
}

/* Optionally, add some padding or border for emphasis */
li.active a {
  padding: 10px;
  border-left: 4px solid #007bff; /* Add a border on the left */
}
#sidebar {
  min-width: 250px;
  max-width: 250px;
  height: 100vh;
  transition: all 0.3s;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;
}

#sidebar.active {
  margin-left: -250px;
}

#content {
  width: 100%;
  padding: 20px;
  transition: all 0.3s;
  margin-left: 250px;
}

#content.active {
  margin-left: 0;
}

#sidebarCollapse {
  margin-left: 15px;
}

.sidebar-header {
  padding: 20px;
  background: #6d7fcc;
  color: white;
}

.list-unstyled {
  padding-left: 0;
}

.list-unstyled li a {
  padding: 10px;
  display: block;
  color: #333;
  text-decoration: none;
}

.list-unstyled li a:hover {
  background: #6d7fcc;
  color: white;
}

.collapse.show {
  background-color: #f8f9fa;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  #sidebar {
    margin-left: -250px; /* Hide sidebar by default on small screens */
  }

  #content {
    margin-left: 0; /* Make content full width on small screens */
  }

  #sidebar.active {
    margin-left: 0; /* Show sidebar when active on small screens */
  }

  #content.active {
    margin-left: 250px; /* Shift content when sidebar is active on small screens */
  }

  #sidebarCollapse {
    display: block;
  }
}

@media (min-width: 769px) {
  #sidebarCollapse {
    display: none; /* Hide toggle button on larger screens */
  }

  #sidebar {
    margin-left: 0; /* Always show sidebar on larger screens */
  }

  #content {
    margin-left: 250px; /* Adjust content margin on larger screens */
  }
}
</style>