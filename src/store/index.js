import { createStore } from 'vuex';
import axios from 'axios';


export default createStore({
  state: {
    users: [],
    currentPage: 1,
    totalPages: 1,
    searchFilter: '',
    usersPerPage: 5
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
      state.totalPages = Math.ceil(users.length / state.usersPerPage);
    },
    SET_CURRENT_PAGE(state, page) {
      state.currentPage = page;
    },
    SET_TOTAL_PAGES(state, totalPages) {
      state.totalPages = totalPages;
    },
    SET_SEARCH_FILTER(state, filter) {
      state.searchFilter = filter;
      state.currentPage = 1;
      }
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);
        const users = response.data;
        commit('SET_USERS', users);
        commit('SET_TOTAL_PAGES', Math.ceil(users.length / 10));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    updatePage({ commit }, page) {
      commit('SET_CURRENT_PAGE', page);
    },
    updateFilter({ commit }, filter) {
        // console.error(filter);
      commit('SET_SEARCH_FILTER', filter);
      commit('SET_CURRENT_PAGE', 1);
    }
  },
  getters: {
    paginatedUsers: state => {
      const startIndex = (state.currentPage - 1) * state.usersPerPage;
      return state.users.slice(startIndex, startIndex + state.usersPerPage);
    },
    totalPages: state => Math.ceil(state.users.length / state.usersPerPage),
  },
});