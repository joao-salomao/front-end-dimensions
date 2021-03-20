<template>
  <div class="main">
    <div class="header">
      <h2 class="text-muted">Perguntas</h2>
      <div class="float-right">
        <b-button
          class="mr-3"
          size="sm"
          variant="light"
          @click="$router.push('/dimension')"
          >Dimensões</b-button
        >
        <b-button
          size="sm"
          variant="primary"
          @click="$router.push('/question/new')"
          >+ Criar pergunta</b-button
        >
      </div>
    </div>
    <div class="body">
      <div class="mb-2" style="max-width: 50%">
        <Dimensions
          multiple
          label="Filtro"
          :selected.sync="selectedDimensions"
          placeholder="Selecione um ou mais dimensões para filtrar"
        />
      </div>
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
          <div class="d-flex w-100 justify-content-between">
            <div class="question__content">
              {{ question.content }}
            </div>
            <div class="question__actions">
              <b-button-group size="sm">
                <b-button
                  variant="primary"
                  @click="$router.push(`/question/edit/${question.id}`)"
                  >Editar</b-button
                >
                <b-button
                  variant="danger"
                  :disabled="question.isDeleting"
                  style="min-width: 57px; min-height: 31px"
                  @click="onClickDeleteQuestion(question)"
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
  </div>
</template>
<style scoped src="./list.styles.css"></style>
<script>
import toast from "@/utils/toast";
import Dimensions from "@/components/SelectDimensions";
export default {
  name: "List",
  components: {
    Dimensions,
  },
  data() {
    return {
      questions: [],
      selectedDimensions: [],
    };
  },
  watch: {
    selectedDimensions() {
      const ids = this.selectedDimensions.map((d) => d.id).join(",");
      this.getQuestions(ids);
    },
  },
  mounted() {
    this.getQuestions();
  },
  methods: {
    getQuestions(dimensions = null) {
      return this.$http
        .get("/question", {
          params: {
            dimensions,
          },
        })
        .then((resp) => {
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
    onClickDeleteQuestion(question) {
      this.$bvModal
        .msgBoxConfirm("Você tem certeza que deseja deletar essa questão ?", {
          size: "sm",
          okTitle: "Sim",
          centered: true,
          buttonSize: "sm",
          cancelTitle: "Não",
          footerClass: "p-2 border-top-0",
          headerClass: "p-2 border-bottom-0",
        })
        .then(async (resp) => {
          if (resp) {
            question.isDeleting = true;
            await this.deleteQuestion(question.id);
            question.isDeleting = false;
            this.removeQuestionFromList(question);
            this.showToast({
              message: `A questão "${question.content}" foi removida`,
            });
          }
        });
    },
    removeQuestionFromList(question) {
      this.questions = this.questions.filter((q) => q !== question);
    },
    deleteQuestion(id) {
      return this.$http.delete(`question/${id}`);
    },
    showToast({ title = "Sucesso !", message, variant = "success" }) {
      toast(this, {
        title,
        message,
        variant,
      });
    },
  },
};
</script>
