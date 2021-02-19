<template>
  <div class="home">
    <nav-bar msg="树符"></nav-bar>
  </div>
</template>

<script>
import navBar from "@/layout/navBar.vue";
export default {
  name: "Home",
  components: {
    navBar,
  },
  data() {
    return {
      height: "500px",
    };
  },
  mounted() {},
};
</script>
