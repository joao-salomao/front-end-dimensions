<template>
  <div class="h-100 p-3">
    <h1 class="text-muted">Criar dimensão</h1>
    <Form :isSubmitting="isSubmitting" @submit="onSubmit" />
  </div>
</template>
<script>
import toast from "@/utils/toast";
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
          toast(this, {
            title: "Sucesso!",
            message: "Dimensão criada.",
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
  },
};
</script>