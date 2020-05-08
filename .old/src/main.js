// The following line loads the standalone build of Vue instead of the runtime-only build,
// so you don't have to do: import Vue from 'vue/dist/vue'
// This is done with the browser options. For the config, see package.json
import BlogIndex from './BlogIndex.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuetify from 'vuetify';

Vue.use(Vuetify);
Vue.use(VueRouter);

new Vue({ // eslint-disable-line no-new
  el: '#app',
  render: (h) => h(BlogIndex, {
    props: {
    }
  })
});
