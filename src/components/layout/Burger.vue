<template>
  <div
    id="burger"
    class="burger"
    :class="{ active: isBurgerActive }"
    @click.prevent="toggle"
  >
    <slot>
      <button type="button" class="burger-button">
        <span class="burger-bar burger-bar--1"></span>
        <span class="burger-bar burger-bar--2"></span>
        <span class="burger-bar burger-bar--3"></span>
      </button>
    </slot>
  </div>
</template>
<script lang="ts">
export default {
  components: {},
  mixins: [],
  props: {
    dummydata: Boolean,
  },
  data() {
    return {
      isBurgerActive: false,
    };
  },
  computed: {},
  presets: {},
  watch: {
    $route(to, from) {
      if (to.path !== from.path && this.isBurgerActive) {
        this.toggle();
      }
    },
  },
  mounted() {},
  methods: {
    toggle() {
      this.isBurgerActive = !this.isBurgerActive;
      this.$emit("changePanelState", this.isBurgerActive);
    },
  },
};
</script>
<style scoped>
.burger {
  margin-left: 20px;
}
.hidden {
  visibility: hidden;
}

button {
  cursor: pointer;
}

/* remove blue outline */
button:focus {
  outline: 0;
}

.burger-button {
  position: relative;
  height: 30px;
  width: 32px;
  display: block;
  z-index: 999;
  border: 0;
  border-radius: 0;
  background-color: transparent;
  pointer-events: all;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar {
  background-color: #fff;
  position: absolute;
  top: 50%;
  right: 6px;
  left: 6px;
  height: 2px;
  width: auto;
  margin-top: -1px;
  transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1),
    opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1),
    background-color 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.burger-bar--1 {
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
}

.burger-bar--2 {
  transform-origin: 100% 50%;
  transform: scaleX(0.8);
}

.burger-button:hover .burger-bar--2 {
  transform: scaleX(1);
}

.no-touchevents .burger-bar--2:hover {
  transform: scaleX(1);
}

.burger-bar--3 {
  transform: translateY(6px);
}

#burger.active .burger-button {
  transform: rotate(-180deg);
}

#burger.active .burger-bar {
  background-color: #fff;
}

#burger.active .burger-bar--1 {
  transform: rotate(45deg);
}

#burger.active .burger-bar--2 {
  opacity: 0;
}

#burger.active .burger-bar--3 {
  transform: rotate(-45deg);
}
@media (max-width: 470px) {
  .burger {
    margin-left: 10px;
  }
}
</style>
