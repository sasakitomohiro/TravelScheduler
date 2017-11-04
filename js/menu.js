Vue.component("common-menu", {
  props: ["current"],
  template: `
    <div class="ui secondary pointing menu">
      <a class="item" href="./index.html" v-bind:class="{active: current=='index'}">
      トップ
      </a>
    </div>`,
methods: {

}
});
