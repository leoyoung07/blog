<template>
  <div class="w-search-wrapper" v-clickoutside="handleClose">
    <v-btn color="pink" dark middle fixed right top fab
           v-show="!searchBarVisible" @click="toggleSearchBar">
      <v-icon>search</v-icon>
    </v-btn>
    <v-toolbar fixed right top v-show="searchBarVisible">
      <v-text-field placeholder="Search..." hide-details single-line
                    prepend-icon="search" append-icon="close"
                    :prepend-icon-cb="search"
                    :append-icon-cb="toggleSearchBar"
                    v-model="keyword"
                    @keypress.enter="search"></v-text-field>
    </v-toolbar>
  </div>
</template>

<script>
'use strict';
import clickoutside from '../directives/clickoutside';
import GitHubApiService from '../services/GitHubApiService';
import Util from '../util/util';
export default {
  name: 'WidgetSearch',
  data: function () {
    return {
      searchBarVisible: false,
      keyword: ''
    };
  },
  methods: {
    navTo: function (url) {
      Util.navTo(url);
    },
    toggleSearchBar: function () {
      this.keyword = '';
      this.searchBarVisible = !this.searchBarVisible;
    },
    search: function () {
      if (!this.keyword) {
        return;
      }
      this.navTo(GitHubApiService.getIssueSearchHtmlUrl(this.keyword));
    },
    handleClose: function () {
      this.searchBarVisible = false;
    }
  },
  directives: {
    clickoutside
  }
};
</script>

<style>
.w-search-wrapper {
  margin: 0;
  padding: 0;
}
</style>
