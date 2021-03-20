<template>
  <b-form
    @submit.prevent="onSubmit"
    class="p-4"
    style="background-color: white; height: 80%"
  >
    <b-form-group label="Nome da dimensão">
      <b-form-input size="sm" v-model="title" required trim />
    </b-form-group>
    <b-button
      size="sm"
      type="submit"
      class="mr-2"
      variant="success"
      style="min-width: 55px"
    >
      <b-spinner small type="grow" v-if="isSubmitting" />
      <span v-else> Salvar </span>
    </b-button>
    <b-button size="sm" variant="light" @click="$router.push('/dimension')"
      >Cancelar</b-button
    >
  </b-form>
</template>
<script>
export default {
  props: {
    dimension: {
      type: Object,
      default: null,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  mounted() {
    if (this.dimension) {
      this.title = this.dimension.title;
    }
  },
  data() {
    return {
      title: null,
    };
  },
  methods: {
    onSubmit() {
      this.$emit("submit", { title: this.title });
    },
  },
};
</script>