<template>
  <div>
    <h2>Detalhes do Usuário</h2>
    <div>
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
    };
  },

  created() {
    const userId = this.$route.params.id;

    if (userId.trim() !== "") {
      userService
        .getUser(userId)
        .then((response) => {
          console.log(response);
          this.user = response.data;
        })
        .catch((error) => {
          console.error("Erro ao pesquisar usuário por ID:", error);
        });
    }
  },
};
</script>
