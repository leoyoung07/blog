<template>
  <v-layout hidden-md-and-up>
    <v-navigation-drawer
      temporary
      absolute
      v-model="drawerVisible"
      class="indigo darken-2"
      width="250"
    >
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img :src="avatarUrl" />
          </v-list-tile-avatar>
          <v-list-tile-content class="white--text subheading">
            <v-list-tile-title>{{ title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-divider></v-divider>
      <v-list class="pt-0" dense>
        <template v-for="(item, index) in navItems">
          <v-list-tile class="my-2" :key="index" @click.stop="navTo(item.url)">
            <v-list-tile-action>
              <v-icon class="white--text">{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content class="white--text subheading">
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar dark color="indigo darken-2">
      <v-toolbar-side-icon @click="drawerVisible = !drawerVisible"></v-toolbar-side-icon>
      <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
    </v-toolbar>
  </v-layout>
</template>

<script>
'use strict';
import Util from '../util/util';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
  name: 'BlogHeaderSmall',
  props: {
    navItems: {
      type: Array,
      default: function () {
        return [];
      }
    },
    title: {
      type: String,
      default: function () {
        return '';
      }
    },
    avatarUrl: {
      type: String,
      default: function () {
        return '';
      }
    }
  },
  methods: {
    navTo: function (url) {
      Util.navTo(url);
    }
  },
  data () {
    return {
      drawerVisible: false
    };
  }
};
</script>

<style>

</style>
