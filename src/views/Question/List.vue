<template>
  <div class="main">
    <div class="header">
      <h2 class="text-muted">Perguntas</h2>
      <div class="float-right">
        <b-button class="mr-3" size="sm" variant="light">Dimensões</b-button>
        <b-button size="sm" variant="primary">+ Criar pergunta</b-button>
      </div>
    </div>
    <div class="body">
      <div class="question" :key="i" v-for="(question, i) in questions">
        <div class="question__status">
          <b-icon
            v-if="question.active"
            icon="check-circle-fill"
            variant="success"
            @click="updateQuestionActiveStatus(question, false)"
          />
          <b-icon
            v-else
            icon="circle"
            @click="updateQuestionActiveStatus(question, true)"
          />
        </div>
        <div class="question__body">
          <div class="question__title">
            {{ question.dimension.title }}
          </div>
          <div class="question__content">
            {{ question.content }}
          </div>
          <div class="question__actions">
            <b-button-group size="sm">
              <b-button variant="primary">Editar</b-button>
              <b-button
                variant="danger"
                :disabled="question.isDeleting"
                @click="deleteQuestion(question)"
              >
                <b-spinner small type="grow" v-if="question.isDeleting" />
                <span class="p-0" v-else> Excluir </span>
              </b-button>
            </b-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./list.styles.css";
export default {
  name: "List",
  data() {
    return {
      questions: [],
    };
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    getQuestions() {
      this.$http.get("/question").then((resp) => {
        this.questions = resp.data.map((q) => {
          return {
            ...q,
            isDeleting: false,
          };
        });
      });
    },
    updateQuestionActiveStatus(question, active) {
      this.$http
        .put(`/question/${question.id}`, {
          active,
        })
        .then(() => {
          question.active = active;
          this.showToast({
            message: "Questão " + (active ? "ativada" : "desativada") + ".",
          });
        });
    },
    deleteQuestion(question) {
      if (!confirm("Você tem certeza que deseja deletar essa questão ?")) {
        return;
      }

      question.isDeleting = true;
      this.$http.delete(`question/${question.id}`).then(() => {
        question.isDeleting = false;
        this.questions = this.questions.filter((q) => q !== question);
        this.showToast({
          message: `A questão "${question.content}" foi removida`,
        });
      });
    },
    showToast({ title = "Sucesso !", message, variant = "success" }) {
      this.$bvToast.toast(message, {
        title,
        variant,
        solid: true,
      });
    },
  },
};
</script>
