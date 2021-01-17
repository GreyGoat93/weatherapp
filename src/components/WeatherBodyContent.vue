<template>
  <section class="content">
    <router-view v-slot="{ Component }">
      <component :is="Component" v-if="!routeChanged" />
    </router-view>
  </section>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const routeChanged = computed(() => store.getters.routeChanged);

    return { routeChanged };
  },
};
</script>

<style scoped></style>
