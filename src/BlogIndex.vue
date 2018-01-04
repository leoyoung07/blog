<template>
  <div id="blogIndex">
    <v-app>
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
      <v-layout row wrap hidden-sm-and-down class="indigo darken-2 white--text pt-5 px-0 pb-0">
        <v-flex xs10 md10 offset-xs1 class="text-xs-left">
          <p class="display-1">{{ title }}</p>
        </v-flex>
        <v-flex xs10 md10 offset-xs1 class="text-xs-left">
          <p>{{ subTitle }}</p>
        </v-flex>
        <v-flex xs12 class="mt-2 indigo darken-4">
          <v-layout row wrap justify-start class="text-xs-center">
            <v-flex xs4 md1 :offset-md2="index === 0" class="pa-0"
                    v-for="(item, index) in navItems" :key="index">
              <v-btn flat class="white--text" @click.stop="navTo(item.url)">{{ item.title }}</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout v-show="!searchBarVisible" hidden-md-and-up>
        <v-navigation-drawer
          temporary
          absolute
          v-model="drawerVisible"
          class="indigo darken-2"
        >
          <v-list class="pa-1">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <img :src="avatarUrl" />
              </v-list-tile-avatar>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>{{ title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
          <v-list class="pt-0" dense>
            <v-divider></v-divider>
            <v-list-tile v-for="item in navItems" :key="item.title" @click.stop="navTo(item.url)">
              <v-list-tile-action>
                <v-icon class="white--text">{{ item.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content class="white--text">
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-navigation-drawer>
        <v-toolbar dark color="indigo darken-2">
          <v-toolbar-side-icon @click="drawerVisible = !drawerVisible"></v-toolbar-side-icon>
          <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
        </v-toolbar>
      </v-layout>
      <v-content>
        <v-container fluid grid-list-lg>
          <v-layout row wrap align-center justify-center v-show="loading">
            <v-flex xs2 md1>
              <v-progress-circular indeterminate :size="50" :width="5" color="indigo darken-2"></v-progress-circular>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center justify-center>
            <v-flex xs12 md8 v-for="issue in issues" :key="issue.id" @click="navTo(issue.htmlUrl)">
              <v-card class="grey--text text--darken-2" hover>
                <v-card-title primary-title>
                  <div class="headline">{{ issue.title }}</div>
                </v-card-title>
                <v-card-text>
                  <div v-html="issue.summary"></div>
                </v-card-text>
                <v-card-actions>
                  <v-btn flat icon color="amber darken-2" @click.stop="navTo(issue.newCommentUrl)">
                    <v-icon>comment</v-icon>
                    <span>{{ issue.comments }}</span>
                  </v-btn>
                  <v-chip label small
                          v-for="label in issue.labels" :key="label.id"
                          :style="{background: '#' + label.color, color: getAccessibleColor(label.color)}"
                          @click.stop="navTo(getLabelUrl(label.name))">{{ label.name }}
                  </v-chip>
                  <v-spacer></v-spacer>
                  <v-btn flat class="blue--text white">READ MORE</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
      <v-footer class="pa-3 indigo darken-2 white--text" app>
        <div>Copyright © {{ new Date().getFullYear() }} Leo Young</div>
      </v-footer>
      <v-snackbar bottom v-model="toastVisible">{{ toastMsg }}</v-snackbar>
    </v-app>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import Vuetify from 'vuetify';
import GitHubApiService from './services/GitHubApiService';
import RenderService from './services/RenderService';
import StorageService from './services/StorageService';

Vue.use(Vuetify);

export default {
  name: 'BlogIndex',
  data () {
    return {
      title: 'Leo Young Blog',
      subTitle: `Don't Repeat Yourself.`,
      issues: [],
      navItems: [{
        title: 'Home',
        url: '/',
        icon: 'home'
      }, {
        title: 'Labels',
        url: GitHubApiService.labelsHtmlUrl,
        icon: 'label'
      }, {
        title: 'Archives',
        url: GitHubApiService.closedMilestonesHtmlUrl,
        icon: 'timeline'
      }, {
        title: 'Github',
        url: GitHubApiService.githubUserHtmlUrl,
        icon: 'code'
      }, {
        title: 'Friends',
        url: '#',
        icon: 'link'
      }, {
        title: 'About',
        url: '#',
        icon: 'account_box'
      }],
      searchBarVisible: false,
      scrollToTopVisible: false,
      drawerVisible: false,
      toastVisible: false,
      toastMsg: '',
      loading: true,
      keyword: '',
      avatarUrl: GitHubApiService.userAvatarUrl
    };
  },
  components: {

  },
  methods: {
    navTo: function (url) {
      window.location.href = url;
    },
    getLabelUrl: function (label) {
      return GitHubApiService.getLabelHtmlUrl(label);
    },
    getAccessibleColor: function (color) {
      return RenderService.getAccessibleColor(color);
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
      this.scrollToTopVisible = (window.pageYOffset || document.documentElement.scrollTop) > 300;
    },
    showToast: function (msg) {
      this.toastMsg = msg;
      this.toastVisible = true;
    }
  },
  computed: {

  },
  async mounted () {
    try {
      const key = 'all-blog-issues';
      this.issues = StorageService.fetch(key) || [];
      this.issues = await GitHubApiService.fetchIssues();
      StorageService.store(key, this.issues);
    } catch (error) {
      this.showToast(error);
    } finally {
      this.loading = false;
    }
  }
};
</script>
<style src="../node_modules/vuetify/dist/vuetify.min.css"></style>
<style>
.chip--label, .chip--label span {
  cursor: pointer !important;
}
</style>
