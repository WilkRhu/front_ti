<template>
  <q-card>
    <h5>Atualização dos dados do Usuário</h5>
    <q-card-section>
      <q-input v-model="user.name" label="Nome" outlined />
    </q-card-section>
    <q-card-actions align="right">
      <q-btn label="Cancelar" @click="cancelUpdate" />
      <q-btn label="Salvar" color="primary" @click="updateUser" />
    </q-card-actions>
  </q-card>

  <div>
    <div>
      <h6>Usuário Atualizado</h6>
      <p><strong>Nome:</strong> {{ user.name }}</p>
      <p><strong>E-mail:</strong> {{ user.email }}</p>
      <p><strong>Tipo de Usuário:</strong> {{ user.user_type }}</p>
    </div>
  </div>
</template>

<script>
import userService from "src/services/userService";
export default {
  data() {
    return {
      user: null,
      userOptions: [],
    };
  },

  methods: {
    loadUser() {
      const userId = this.$route.params.id;
      console.log(userId);
      userService
        .getUser(userId)
        .then((response) => {
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Erro ao obter dados do usuário:", error);
        });
    },
    updateUser() {
      const userId = this.$route.params.id;
      userService
        .updateUser(userId, { name: this.user.name })
        .then((response) => {
          console.log("Usuário atualizado com sucesso:", response.data);
          this.loadUser();
        })
        .catch((error) => {
          console.error("Erro ao atualizar o usuário:", error);
        });
    },
  },

  created() {
    this.loadUser();
  },
};
</script>
