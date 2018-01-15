<template>
  <div id="blogIndex">
    <v-app>
      <header>
        <blog-header-large :nav-items="navItems" :title="title" :sub-title="subTitle"></blog-header-large>
        <blog-header-small v-show="!searchBarVisible" :nav-items="navItems" :title="title" :avatar-url="avatarUrl"></blog-header-small>
      </header>
      <v-content>
        <v-container fluid grid-list-lg>
          <v-layout row wrap align-center justify-center v-show="loading">
            <v-flex xs2 md1>
              <v-progress-circular indeterminate :size="50" :width="5" color="indigo darken-2"></v-progress-circular>
            </v-flex>
          </v-layout>
          <router-view @loading="loading=true" @loaded="loading=false" @loadError="showToast(arguments[0]);"></router-view>
        </v-container>
      </v-content>
      <v-footer class="pa-3 indigo darken-2 white--text" app>
        <div>Copyright © {{ new Date().getFullYear() }} Leo Young</div>
      </v-footer>
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
      <v-fab-transition>
        <v-btn color="red" dark middle fixed right bottom fab
               @click="scrollToTop"
               v-show="scrollToTopVisible"
               v-scroll="onScroll">
          <v-icon>keyboard_arrow_up</v-icon>
        </v-btn>
      </v-fab-transition>
      <v-snackbar bottom v-model="toastVisible">{{ toastMsg }}</v-snackbar>
    </v-app>
  </div>
</template>

<script>
'use strict';
import _ from 'lodash';
import BlogHeaderLarge from './components/BlogHeaderLarge.vue';
import BlogHeaderSmall from './components/BlogHeaderSmall.vue';
import GitHubApiService from './services/GitHubApiService';
import routes from './routes/route';
import Util from './util/util';
import VueRouter from 'vue-router';

const router = new VueRouter({
  routes: routes
});

export default {
  name: 'BlogIndex',
  data () {
    return {
      title: 'Leo Young Blog',
      subTitle: `Don't Repeat Yourself.`,
      navItems: [{
        title: 'Home',
        url: '#/',
        icon: 'home'
      }, {
        title: 'Labels',
        url: GitHubApiService.labelsHtmlUrl,
        icon: 'fa-tags'
      }, {
        title: 'Archives',
        url: GitHubApiService.closedMilestonesHtmlUrl,
        icon: 'timeline'
      }, {
        title: 'Github',
        url: GitHubApiService.githubUserHtmlUrl,
        icon: 'fa-github'
      }, {
        title: 'Friends',
        url: '#/friends',
        icon: 'link'
      }, {
        title: 'About',
        url: '#/about',
        icon: 'account_box'
      }],
      searchBarVisible: false,
      scrollToTopVisible: false,
      toastVisible: false,
      toastMsg: '',
      loading: false,
      keyword: '',
      avatarUrl: GitHubApiService.userAvatarUrl
    };
  },
  components: {
    BlogHeaderLarge,
    BlogHeaderSmall
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
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
    onScroll: function () {
      _.throttle(() => {
        this.scrollToTopVisible = (window.pageYOffset || document.documentElement.scrollTop) > 300;
      }, 1000)();
    },
    showToast: function (msg) {
      this.toastMsg = msg;
      this.toastVisible = true;
    }
  },
  computed: {

  },
  router: router
};
</script>
<style src="../node_modules/vuetify/dist/vuetify.min.css"></style>
