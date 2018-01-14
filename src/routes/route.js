'use strict';
import BlogList from '../components/BlogList.vue';
import ViewAbout from '../components/ViewAbout.vue';
import ViewFriends from '../components/ViewFriends.vue';

const routes = [{
  path: '/',
  component: BlogList
}, {
  path: '/about',
  component: ViewAbout
}, {
  path: '/friends',
  component: ViewFriends
}];

export default routes;
