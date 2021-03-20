<template>
  <div class="h-100">
    <h2 class="text-muted">Editar questão</h2>
    <div class="text-center" v-if="isLoading">
      <b-spinner type="grow" />
    </div>
    <Form
      v-else
      :question="question"
      :isSubmitting="isSubmitting"
      @submit="onSubmit"
    />
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
      question: null,
      isLoading: true,
      isSubmitting: false,
    };
  },
  mounted() {
    this.getQuestion();
  },
  methods: {
    getQuestion() {
      this.isLoading = true;
      this.$http
        .get(`/question/${this.$route.params.id}`)
        .then((resp) => {
          this.question = resp.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    onSubmit(data) {
      this.isSubmitting = true;
      this.$http
        .put(`/question/${this.$route.params.id}`, data)
        .then(() => {
          toast(this, {
            title: "Sucesso!",
            message: "Questão atualizada.",
          });

          this.$router.push("/question");
        })
        .catch(() => {
          toast(this, {
            title: "Tente novamente.",
            message: "Algo deu errado",
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