<template>
  <div class="h-100 p-3">
    <h1 class="text-muted">Criar dimensão</h1>
    <Form :isSubmitting="isSubmitting" @submit="onSubmit" />
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
      isSubmitting: false,
    };
  },
  methods: {
    onSubmit(data) {
      this.isSubmitting = true;
      this.$http
        .post("/dimension", data)
        .then(() => {
          this.$bvToast.toast("Dimensão criada.", {
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
  },
};
</script>