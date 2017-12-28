<template>
  <div id="blogIndex">
    <v-app>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12 v-for="issue in issues" :key="issue.id">
            <v-btn color="pink" dark middle fixed right top fab>
              <v-icon>search</v-icon>
            </v-btn>
            <v-card class="grey--text text--darken-2">
              <v-card-title primary-title>
                <div class="headline">{{ issue.title }}</div>
              </v-card-title>
              <v-card-text>
                <div v-html="getSummary(issue.body)"></div>
              </v-card-text>
              <v-card-actions>
                <v-btn flat class="cyan--text text--accent-4 white">READ</v-btn>
                <v-spacer></v-spacer>
                <v-btn flat icon color="amber darken-2">
                  <v-icon>comment</v-icon>
                  <span>{{ issue.comments }}</span>
                </v-btn>
                <v-btn icon>
                  <v-icon>bookmark</v-icon>
                </v-btn>
                <v-btn icon>
                  <v-icon>share</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
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
      issues: GitHubApiService.fetchIssues()
    };
  },
  components: {

  },
  methods: {
    getSummary: function (text) {
      return RenderService.getSummary(text, 300);
    }
  },
  computed: {

  },
  mounted () {
    console.log(this.issues);
  }
};
</script>
<style src="../node_modules/vuetify/dist/vuetify.min.css"></style>
