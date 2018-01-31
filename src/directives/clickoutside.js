'use strict';
// Thanks to: https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js
export default {
  bind (el, binding, vnode) {
    function documentHandler (e) {
      if (el.contains(e.target)) {
        return false;
      }
      if (binding.expression) {
        binding.value(e);
      }
    }
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
    document.addEventListener('touchstart', documentHandler);
  },
  update () {},
  unbind (el, binding) {
    document.removeEventListener('click', el.__vueClickOutside__);
    document.removeEventListener('touchstart', el.__vueClickOutside__);
    delete el.__vueClickOutside__;
  }
};
