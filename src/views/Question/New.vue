<template>
  <div class="h-100">
    <h1>Criar questão</h1>
    <Form :isSubmitting="isSubmitting" @submit="createQuestion" />
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
    createQuestion(data) {
      this.isSubmitting = true;
      this.$http
        .post("/question", data)
        .then(() => {
          this.$bvToast.toast("Questão criada.", {
            title: "Sucesso!",
            variant: "success",
            solid: true,
          });

          setTimeout(() => {
            this.$router.push("/question");
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