<template>
  <div class="h-100">
    <h2 class="text-muted">Editar dimensão</h2>
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
import toast from "@/utils/toast";
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
          toast(this, {
            title: "Sucesso!",
            message: "Dimensão atualizada.",
          });

          this.$router.push("/dimension");
        })
        .catch(() => {
          toast(this, {
            title: "Algo deu errado",
            message: "Tente novamente.",
            variant: "danger",
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