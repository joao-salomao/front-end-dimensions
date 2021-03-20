<style scoped>
.multiselect:focus {
  border: 2px solid #80bdff;
  border-radius: 5px;
}
</style>
<template>
  <div>
    <label>{{ label }}</label>
    <multiselect
      ref="select"
      label="title"
      track-by="id"
      v-model="model"
      :options="options"
      :multiple="multiple"
      :loading="isLoading"
      :allowEmpty="allowEmpty"
      :placeholder="placeholder"
      selectedLabel="Selecionado"
      deselectLabel="Clique para remover"
      selectLabel="Clique para selecionar"
    >
      <template slot="noOptions"> Nenhuma dimensão disponível </template>
    </multiselect>
  </div>
</template>
<script>
export default {
  props: {
    selected: {
      type: [Object, Array],
      default: null,
    },
    label: {
      type: String,
      default: "Dimensões",
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    allowEmpty: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "Selecione uma dimensão",
    },
  },
  data() {
    return {
      model: null,
      options: [],
      isLoading: true,
    };
  },
  mounted() {
    this.getDimensions();
  },
  watch: {
    selected(value) {
      this.model = value;
    },
    model() {
      this.$emit("update:selected", this.model);
    },
  },
  methods: {
    openSelect() {
      this.$refs.select.$el.focus();
    },
    getDimensions() {
      this.isLoading = true;
      this.$http
        .get("/dimension")
        .then((resp) => {
          this.options = resp.data;
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },
};
</script>