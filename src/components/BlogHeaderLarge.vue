<template>
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
          <v-btn flat class="white--text" @click.stop="navTo(item.url)">
            <v-icon class="white--text">{{ item.icon }}</v-icon>
            <span class="ml-1">{{ item.title }}</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict';
import Util from '../util/util';
import Vue from 'vue';
import Vuetify from 'vuetify';

Vue.use(Vuetify);

export default {
  name: 'BlogHeaderLarge',
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
    subTitle: {
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
  }
};
</script>

<style>

</style>
