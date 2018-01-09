<template>
  <v-layout row wrap align-center justify-center>
    <v-flex xs12 md8 v-for="issue in issues" :key="issue.id" @click="navTo(issue.htmlUrl)">
      <v-card class="grey--text text--darken-2" hover>
        <v-card-title primary-title>
          <div class="headline">{{ issue.title }}</div>
        </v-card-title>
        <v-card-text class="pt-0">
          <div class="grey--text">
            {{ formatedDateTime(issue.updatedAt) }}
          </div>
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
</template>

<script>
'use strict';
import GitHubApiService from '../services/GitHubApiService';
import moment from 'moment';
import RenderService from '../services/RenderService';
import Util from '../util/util';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
  name: 'BlogList',
  props: {
    issues: {
      type: Array,
      default: function () {
        return [];
      }
    }
  },
  methods: {
    formatedDateTime: function (inputDateTime) {
      return moment(inputDateTime).format('YYYY-MM-DD HH:mm:ss');
    },
    getLabelUrl: function (label) {
      return GitHubApiService.getLabelHtmlUrl(label);
    },
    getAccessibleColor: function (color) {
      return RenderService.getAccessibleColor(color);
    },
    navTo: function (url) {
      Util.navTo(url);
    }
  }
};
</script>

<style>
.chip--label, .chip--label span {
  cursor: pointer !important;
}
</style>
