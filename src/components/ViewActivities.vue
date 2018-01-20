<template>
  <v-layout row wrap align-center justify-center>
    <v-flex lg8 lg-offset2 sm10 sm-offset1 xs12>
      <v-subheader v-text="timelineTitle" class="light-blue--text text--darken-2"></v-subheader>
      <timeline-list :items="publicEvents"></timeline-list>
    </v-flex>
  </v-layout>
</template>

<script>
'use strict';
import GitHubApiService from '../services/GitHubApiService';
import TimelineList from './TimelineList.vue';

export default {
  name: 'ViewActivities',
  props: {
  },
  data () {
    return {
      publicEvents: [],
      timelineTitle: 'Recent Activities on GitHub'
    };
  },
  components: {
    TimelineList
  },
  methods: {
  },
  computed: {
    publicEventsStat: function () {
      let stat = {};
      const updateStat = (date, contributions) => {
        stat[date] = stat[date] ? stat[date] + contributions : contributions;
      };
      this.publicEvents.forEach(e => {
        const date = e.created_at.replace(/T.*/gi, '');
        if (e.type === 'PushEvent') {
          let contributions = parseInt(e.payload.size, 10);
          contributions = isNaN(contributions) ? 0 : contributions;
          updateStat(date, contributions);
        } else if (e.type === 'IssuesEvent') {
          if (e.payload.action === 'opened') {
            updateStat(date, 1);
          }
        }
      });
      return stat;
    }
  },
  mounted: async function () {
    this.publicEvents = await GitHubApiService.fetchPublicEvents();
  }
};
</script>

<style>
.chip--label, .chip--label span {
  cursor: pointer !important;
}
</style>
