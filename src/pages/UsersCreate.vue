<template>
  <q-page>
    <q-form @submit="createUser">
      <q-card>
        <q-card-section>
          <div class="q-gutter-md" style="display: flex; flex-direction: row">
            <div style="flex: 1">
              <q-input
                v-model="user.name"
                label="Nome"
                placeholder="Nome do usuário"
                outlined
              />
              <q-input
                v-model="user.email"
                label="E-mail"
                placeholder="E-mail do usuário"
                outlined
              />
              <q-input
                v-model="user.password"
                label="Password"
                placeholder="Password"
                type="password"
                outlined
              />
              <q-select
                v-model="user.user_type"
                label="Select Type User"
                outlined
                :options="['admin', 'medical', 'patient']"
              />
            </div>
            <div style="flex: 1">
              <q-input
                v-model="user.medical_crm"
                label="Medical Crm"
                placeholder="Medical Crm"
                type="text"
                outlined
              />
              <q-input
                v-model="user.date_of_birth_patient"
                label="Date Of birth Patient"
                placeholder="Data de Nascimento"
                type="date"
                outlined
              />
              <q-input
                v-model="user.phone_number_patient"
                label="Phone Number Patient"
                placeholder="81988547521"
                type="text"
                outlined
              />
            </div>
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="Cancelar" @click="cancelCreation" />
          <q-btn
            type="submit"
            label="Salvar"
            color="primary"
            :disable="saving"
          />
        </q-card-actions>
      </q-card>
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
    </q-form>
  </q-page>
</template>

<script>
import userService from "src/services/userService";

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
        medical_crm: "",
        date_of_birth_patient: "",
        phone_number_patient: "",
      },
      saving: false,
      successAlert: false,
      errorAlert: false,
      successMessage: "",
      errorMessage: "",
    };
  },
  methods: {
    createUser() {
      console.log("Dados do usuário a serem enviados:", this.user);
      this.saving = true;

      userService
        .createUser(this.user)
        .then((response) => {
          console.log("Usuário criado com sucesso:", response.data);
          this.successAlert = true;
          this.successMessage = "Usuário criado com sucesso";

          this.$router.push("/register");
        })
        .catch((error) => {
          console.error("Erro ao criar usuário:", error);

          this.errorAlert = true;
          this.errorMessage = "Erro ao criar usuário";

          this.saving = false;
        });
    },
    cancelCreation() {
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.success-message {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}

.error-message {
  opacity: 1;
  transition: opacity 0.5s ease-in-out;
}
</style>
