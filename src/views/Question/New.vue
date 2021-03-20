<template>
  <div class="h-100">
    <h2 class="text-muted">Criar questão</h2>
    <Form :isSubmitting="isSubmitting" @submit="createQuestion" />
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
      isSubmitting: false,
    };
  },
  methods: {
    createQuestion(data) {
      this.isSubmitting = true;
      this.$http
        .post("/question", data)
        .then(() => {
          toast(this, {
            title: "Sucesso!",
            message: "Questão criada.",
          });

          this.$router.push("/question");
        })
        .catch(() => {
          toast(this, {
            title: "Sucesso!",
            message: "Questão criada.",
            variant: "danger",
          });
        })
        .finally(() => {
          this.isSubmitting = false;
        });
    },
  },
};
</script>