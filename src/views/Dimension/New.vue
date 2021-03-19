<template>
  <div class="h-100 p-3">
    <h1 class="text-muted">Criar dimensão</h1>
    <b-form
      @submit="onSubmit"
      class="p-4"
      style="background-color: white; height: 80%"
    >
      <b-form-group label="Nome da dimensão">
        <b-form-input size="sm" v-model="title" required trim />
      </b-form-group>
      <b-button size="sm" type="submit" class="mr-2" variant="success">
        <b-spinner small type="grow" v-if="isSubmitting" />
        <span v-else> Salvar </span>
      </b-button>
      <b-button size="sm" variant="light" @click="$router.push('/dimension')"
        >Cancelar</b-button
      >
    </b-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      title: null,
      isSubmitting: false,
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      this.isSubmitting = true;
      this.$http
        .post("/dimension", { title: this.title })
        .then(() => {
          this.$bvToast.toast("Dimensão criada.", {
            title: "Sucesso!",
            variant: "success",
            solid: true,
          });

          setTimeout(() => {
            this.$router.push("/dimension");
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