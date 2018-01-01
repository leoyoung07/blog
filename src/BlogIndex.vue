<template>
  <div id="blogIndex">
    <v-app>
      <v-btn color="pink" dark middle fixed right top fab>
        <v-icon>search</v-icon>
      </v-btn>
      <v-layout row wrap class="indigo darken-2 white--text pt-5 px-0 pb-0">
        <v-flex xs10 md10 offset-xs1 class="text-xs-left">
          <p class="display-1">Leo Young Blog</p>
        </v-flex>
        <v-flex xs10 md10 offset-xs1 class="text-xs-left">
          <p>Don't Repeat Yourself.</p>
        </v-flex>
        <v-flex xs12 class="mt-2 indigo darken-4">
          <v-layout row wrap justify-start class="text-xs-center">
            <v-flex xs4 md1 :offset-md2="index === 0" v-for="(item, index) in navItems" :key="index" class="pa-0">
              <v-btn flat class="white--text" @click.stop="navTo(item.url)">{{ item.title }}</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-content>
        <v-container fluid grid-list-lg>
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
                  <v-chip label small v-for="label in issue.labels" :key="label.id" :style="{background: '#' + label.color, color: getAccessibleColor(label.color)}" @click.stop="navTo(getLabelUrl(label.name))">{{ label.name }}</v-chip>
                  <v-spacer></v-spacer>
                  <v-btn flat class="blue--text white">READ MORE</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-content>
    <!-- <v-container fluid class="pa-0 ma-0"> -->
    <!-- <v-footer class="pa-3 grey darken-3 white--text" app> -->
    <!-- <v-spacer></v-spacer> -->
    <!-- <div>Leo Young - {{ new Date().getFullYear() }}</div> -->
    <!-- </v-footer> -->
    <!-- </v-container> -->
    </v-app>
  </div>
</template>

<script>
'use strict';
import Vue from 'vue';
import Vuetify from 'vuetify';
import GitHubApiService from './services/GitHubApiService';
import RenderService from './services/RenderService';

Vue.use(Vuetify);

export default {
  name: 'BlogIndex',
  data () {
    return {
      issues: [],
      navItems: [{
        title: 'Home',
        url: '/'
      }, {
        title: 'Labels',
        url: GitHubApiService.labelsHtmlUrl
      }, {
        title: 'Archives',
        url: GitHubApiService.closedMilestonesHtmlUrl
      }, {
        title: 'Github',
        url: GitHubApiService.githubUserHtmlUrl
      }, {
        title: 'Friends',
        url: '#'
      }, {
        title: 'About',
        url: '#'
      }]
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
    }
  },
  computed: {

  },
  async mounted () {
    this.issues = await GitHubApiService.fetchIssues();
    console.log(this.issues);
  }
};
</script>
<style src="../node_modules/vuetify/dist/vuetify.min.css"></style>
<style>
.chip--label, .chip--label span {
  cursor: pointer !important;
}
</style>
