<template>
  <div class="home">
    <nav-bar msg="树符"></nav-bar>
  </div>
</template>

<script>
// @ is an alias to /src
import navBar from "@/layout/navBar.vue";

export default {
  name: "Home",
  components: {
    navBar,
  },
};
</script>
