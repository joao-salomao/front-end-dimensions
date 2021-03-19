<template>
  <div class="main">
    <div class="header">
      <h2 class="text-muted">Perguntas</h2>
      <div class="float-right">
        <b-button
          class="mr-3"
          size="sm"
          variant="light"
          @click="$router.push('/question')"
          >Perguntas</b-button
        >
        <b-button size="sm" variant="primary">+ Criar dimensão</b-button>
      </div>
    </div>
    <div class="w-100 p-3" style="background-color: white;">
      <div
        class="d-flex justify-content-between w-100 mb-2 p-2"
        :key="i"
        style="border: 5px solid rgba(128, 128, 128, 0.2)"
        v-for="(dimension, i) in dimensions"
      >
        <div>
          {{ dimension.title }}
        </div>
        <div>
          <b-button
            size="sm"
            variant="danger"
            :disabled="dimension.isDeleting"
            @click="deleteDimension(dimension)"
          >
            <b-spinner small type="grow" v-if="dimension.isDeleting" />
            <span class="p-0" v-else> Excluir </span>
          </b-button>
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
    deleteDimension(dimension) {
      if (!confirm("Você tem certeza que deseja deletar essa dimensão ?")) {
        return;
      }

      dimension.isDeleting = true;
      this.$http.delete(`dimension/${dimension.id}`).then(() => {
        dimension.isDeleting = false;
        this.dimensions = this.dimensions.filter((q) => q !== dimension);
        this.showToast({
          message: `A questão "${dimension.content}" foi removida`,
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
