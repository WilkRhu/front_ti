<template>
  <q-page>
    <q-form @submit="login">
      <q-input v-model="email" label="E-mail" outlined />
      <q-input v-model="password" label="Senha" type="password" outlined />
      <q-btn type="submit" label="Entrar" color="primary" />
    </q-form>
  </q-page>
  <q-alert
    v-if="successAlert"
    color="positive"
    icon="check"
    border="rounded"
    class="q-mb-md success-message"
  >
    {{ successMessage }}
  </q-alert>

  <!-- Alerta de erro -->
  <q-alert
    v-if="errorAlert"
    color="negative"
    icon="warning"
    border="rounded"
    class="q-mb-md error-message"
  >
    {{ errorMessage }}
  </q-alert>
</template>

<script>
import userService from "src/services/userService";

export default {
  data() {
    return {
      email: "",
      password: "",
      successAlert: false,
      errorAlert: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await userService.login(this.email, this.password);
        this.successAlert = true;
        this.successMessage = "Login Success!" + response;
        this.$router.push("/");
      } catch (error) {
        this.errorAlert = true;
        this.errorMessage = "Login Error" + error;
        console.error("Erro ao fazer login:", error);
      }
    },
  },
};
</script>
