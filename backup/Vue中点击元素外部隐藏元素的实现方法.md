在弹窗等组件中，通常需要实现点击组件外部隐藏该组件的功能，下面整理一下常用的实现方式。

## 实现一: 添加遮罩层( `overlay` )

  在弹出的目标元素外层添加透明或半透明的遮罩层，可设置样式：

  ```CSS
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  ```

  监听遮罩层的 `click` 事件，通过 `e.target` 判断点击位置，从而决定是否隐藏弹出的元素。但是如果不方便为目标元素添加遮罩层，这种方式就不适用。

## 实现二: 监听  `document` 的点击事件

  在Vue的hooks中监听 `document` 元素的 `click` 事件，同样通过 `e.target` 判断点击位置，决定是否隐藏目标元素。

  ```JavaScript
  methods: {
      handleBodyClick(){
          if (目标区域出来了) {
            let _con = $(目标区域)
            if (!_con.contains(e.target)) {
              // 点击目标区域外的时候关闭目标区域
            }
          }
      },
  },
  mounted () {
    document.addEventListener('click', this.handleBodyClick)
  },
  destroyed () {
    document.removeEventListener('click', this.handleBodyClick)
  }
  ```

## 实现三: Vue的自定义指令( `Custom Directives` )

  其实这种方式也是监听  `document` 的点击事件，只不过是利用Vue的自定义指令( `Custom Directives` )来实现。这也是 `iView` 中的实现方式。

  ```JavaScript
  Vue.directive('clickoutside', {
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
    },
    unbind (el, binding) {
      document.removeEventListener('click', el.__vueClickOutside__);
      delete el.__vueClickOutside__;
    }
  });
  ```

  之后在组件上用 `v-clickoutside="handleClose"` 处理外部点击事件，就可以实现关闭/隐藏目标元素。

## 参考

- [vue点击其它任何地方隐藏dom - 风中孤狼的回答 - SegmentFault](https://segmentfault.com/q/1010000012208285/a-1020000012208986)

- [[Vue.js2.x]可从外部关闭的下拉菜单的自定义指令 - 掘金](https://juejin.im/post/58be0c181b69e6006b2cca1e)

- [iview/clickoutside.js at 2.0 · iview/iview](https://github.com/iview/iview/blob/2.0/src/directives/clickoutside.js)

