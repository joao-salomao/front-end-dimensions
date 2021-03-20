<template>
  <div class="h-100">
    <h1 class="text-muted">Editar dimensão</h1>
    <div class="text-center" v-if="isLoading">
      <b-spinner type="grow" />
    </div>
    <Form
      v-else
      :dimension="dimension"
      :isSubmitting="isSubmitting"
      @submit="updateDimension"
    />
  </div>
</template>
<script>
import Form from "./Form";
export default {
  components: {
    Form,
  },
  data() {
    return {
      dimension: null,
      isLoading: true,
      isSubmitting: false,
    };
  },
  mounted() {
    this.getDimension();
  },
  methods: {
    updateDimension(data) {
      this.isSubmitting = true;
      this.$http
        .put(`/dimension/${this.$route.params.id}`, data)
        .then(() => {
          this.$bvToast.toast("Dimensão atualizada.", {
            title: "Sucesso!",
            variant: "success",
            solid: true,
          });

          setTimeout(() => {
            this.$router.push("/dimension");
          }, 1000);
        })
        .catch(() => {
          this.$bvToast.toast("Tente novamente.", {
            title: "Algo deu errado",
            variant: "danger",
            solid: true,
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
    getDimension() {
      this.isLoading = true;
      this.$http
        .get(`/dimension/${this.$route.params.id}`)
        .then((resp) => {
          this.dimension = resp.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>