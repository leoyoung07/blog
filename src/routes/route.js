'use strict';
import BlogList from '../components/BlogList.vue';
import ViewActivities from '../components/ViewActivities.vue';
import ViewFriends from '../components/ViewFriends.vue';

const routes = [{
  path: '/',
  component: BlogList
}, {
  path: '/activities',
  component: ViewActivities
}, {
  path: '/friends',
  component: ViewFriends
}];

export default routes;
