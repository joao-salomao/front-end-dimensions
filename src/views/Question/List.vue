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
        <label> Filtro </label>
        <multiselect
          multiple
          label="text"
          track-by="value"
          :options="dimensionOptions"
          v-model="selectedDimensions"
          selectedLabel="Selecionado"
          deselectLabel="Clique para remover"
          selectLabel="Clique para selecionar"
          placeholder="Selecione um ou mais dimensões para filtrar"
        >
          <template slot="noOptions"> Nenhuma dimensão disponível </template>
        </multiselect>
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
  </div>
</template>
<style scoped src="./list.styles.css"></style>
<script>
import { uniqBy } from "lodash";
export default {
  name: "List",
  data() {
    return {
      questions: [],
      dimensions: [],
      selectedDimensions: [],
    };
  },
  computed: {
    dimensionOptions() {
      return this.dimensions.map((item) => {
        return {
          value: item.id,
          text: item.title,
        };
      });
    },
  },
  watch: {
    selectedDimensions() {
      const ids = this.selectedDimensions.map((d) => d.value).join(",");
      this.getQuestions(ids);
    },
  },
  mounted() {
    this.getQuestions().then(this.setDimensions);
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
    setDimensions() {
      const dimensions = this.questions.map((q) => q.dimension);
      this.dimensions = uniqBy(dimensions, "id");
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
