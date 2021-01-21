<template>
  <div class="modal" v-if="isModalOpen">
    <div class="modal-outer" @click="closeModal"></div>
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const isModalOpen = computed(() => store.getters.isModalOpen);

    function closeModal() {
      store.commit("toggleModal", false);
    }

    return { isModalOpen, closeModal };
  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #4444;
  top: 0;
  left: 0;
  z-index: 101;
}

.modal-outer {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 102;
}

.modal-content {
  background: #fff;
  z-index: 103;
  padding: 0.5em;
  border-radius: 1em;
  width: 30%;
}
</style>
