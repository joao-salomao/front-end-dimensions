<template>
  <div class="main">
    <div class="header">
      <h2 class="text-muted">Dimensões</h2>
      <div class="float-right">
        <b-button
          class="mr-3"
          size="sm"
          variant="light"
          @click="$router.push('/question')"
          >Perguntas</b-button
        >
        <b-button
          size="sm"
          variant="primary"
          @click="$router.push('/dimension/new')"
          >+ Criar dimensão</b-button
        >
      </div>
    </div>
    <div class="body">
      <div class="dimension" :key="i" v-for="(dimension, i) in dimensions">
        <div>
          {{ dimension.title }}
        </div>
        <b-button-group size="sm">
          <b-button
            variant="primary"
            @click="$router.push('/dimension/edit/' + dimension.id)"
            >Editar</b-button
          >
          <b-button
            variant="danger"
            :disabled="dimension.isDeleting"
            style="min-width: 57px; min-height: 31px"
            @click="onClickDeleteDimension(dimension)"
          >
            <b-spinner small type="grow" v-if="dimension.isDeleting" />
            <span class="p-0" v-else> Excluir </span>
          </b-button>
        </b-button-group>
      </div>
    </div>
  </div>
</template>
<style scoped src="./list.styles.css"></style>
<script>
import toast from "@/utils/toast";
const MODAL_DEFAULT_CONFIG = {
  size: "sm",
  okTitle: "Sim",
  centered: true,
  buttonSize: "sm",
  cancelTitle: "Não",
  footerClass: "p-2 border-top-0",
  headerClass: "p-2 border-bottom-0",
};

export default {
  name: "List",
  data() {
    return {
      dimensions: [],
    };
  },
  mounted() {
    this.getDimensions();
  },
  methods: {
    getDimensions() {
      this.$http.get("/dimension").then((resp) => {
        this.dimensions = resp.data.map((q) => {
          return {
            ...q,
            isDeleting: false,
          };
        });
      });
    },
    onClickDeleteDimension(dimension) {
      if (dimension.questions.length) {
        this.showDeleteNotAllowedMessage(dimension);
      } else {
        this.showDeleteWizard(dimension);
      }
    },
    showDeleteNotAllowedMessage(dimension) {
      let text =
        "Não é possível deletar essa dimensão pois as seguintes questões estão vinculadas a ela: ";

      const questions = dimension.questions
        .map((i) => `"${i.content}"`)
        .join(", ");

      this.$bvModal.msgBoxOk(text + questions, {
        ...MODAL_DEFAULT_CONFIG,
        size: "md",
      });
    },
    showDeleteWizard(dimension) {
      this.$bvModal
        .msgBoxConfirm(
          "Você tem certeza que deseja deletar essa dimensão ?",
          MODAL_DEFAULT_CONFIG
        )
        .then(async (resp) => {
          if (resp) {
            dimension.isDeleting = true;
            await this.deleteDimension(dimension.id);
            dimension.isDeleting = false;
            this.removeDimensionFromList(dimension);
            toast(this, {
              title: "Sucesso !",
              message: `A dimensão "${dimension.title}" foi removida`,
            });
          }
        });
    },
    deleteDimension(id) {
      return this.$http.delete(`dimension/${id}`);
    },
    removeDimensionFromList(dimension) {
      this.dimensions = this.dimensions.filter((q) => q !== dimension);
    },
  },
};
</script>
