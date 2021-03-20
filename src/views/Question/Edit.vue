<template>
  <div class="h-100 p-3">
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
          this.$bvToast.toast("Questão atualizada.", {
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