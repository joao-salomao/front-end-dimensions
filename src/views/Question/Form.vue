<style scoped>
.form {
  height: 80%;
  padding: 20px;
  background-color: white;
}
</style>
<template>
  <b-form class="form" @submit.prevent="onSubmit">
    <b-form-group label="Pergunta">
      <b-form-input ref="content" v-model="content" required trim type="text" />
    </b-form-group>
    <Dimensions
      ref="dimension"
      class="mb-2"
      label="Dimensão"
      :allowEmpty="false"
      :selected.sync="dimension"
    />
    <div>
      <b-button size="sm" type="submit" class="mr-2" variant="success">
        <b-spinner small type="grow" v-if="isSubmitting" />
        <span v-else> Salvar </span>
      </b-button>
      <b-button size="sm" variant="light" @click="$router.push('/question')"
        >Cancelar</b-button
      >
    </div>
  </b-form>
</template>
<script>
import Dimensions from "@/components/SelectDimensions";
export default {
  components: {
    Dimensions,
  },
  props: {
    question: {
      type: Object,
      default: null,
    },
    isSubmitting: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      content: null,
      dimension: null,
    };
  },
  mounted() {
    if (this.question) {
      this.content = this.question.content;
      this.dimension = this.question.dimension;
    }
  },
  methods: {
    onSubmit() {
      if (this.validate()) {
        this.$emit("submit", {
          content: this.content,
          dimension_id: this.dimension.id,
        });
      }
    },
    validate() {
      if (!this.content) {
        this.$refs.content.$el.focus();
        return false;
      }

      if (!this.dimension) {
        this.$refs.dimension.openSelect();
        return false;
      }

      return true;
    },
  },
};
</script>