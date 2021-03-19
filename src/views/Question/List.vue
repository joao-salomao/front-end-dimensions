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
            v-if="question.status"
            icon="check-circle-fill"
            variant="success"
            @click="question.status = false"
          />
          <b-icon v-else icon="circle" @click="question.status = true" />
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
              <b-button variant="danger">Excluir</b-button>
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
  name: "Home",
  data() {
    return {
      questions: [
        {
          content:
            "Quantos dias na semana você prefere trabalhar de home-office",
          status: true,
          dimension: {
            id: 1,
            title: "Estrutura",
          },
        },
        {
          content:
            "Quantos dias na semana você prefere trabalhar de home-office",
          status: true,
          dimension: {
            id: 1,
            title: "Estrutura",
          },
        },
        {
          content:
            "Quantos dias na semana você prefere trabalhar de home-office",
          status: false,
          dimension: {
            id: 1,
            title: "Estrutura",
          },
        },
      ],
    };
  },
};
</script>
