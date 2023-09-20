<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:header="props">
        <q-tr :props="props">
          <q-th auto-width />
          <q-th v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.label }}
          </q-th>
        </q-tr>
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-btn
              size="sm"
              color="accent"
              round
              dense
              @click="props.expand = !props.expand"
              :icon="props.expand ? 'remove' : 'add'"
            />
          </q-td>
          <q-td v-for="col in props.cols" :key="col.name" :props="props">
            {{ col.value }}
          </q-td>
        </q-tr>
        <q-tr v-show="props.expand" :props="props">
          <q-td colspan="100%">
            <div class="text-left">
              <q-btn
                color="primary"
                label=""
                class="q-btn-xs q-mr-md"
                @click="editUser(props.row.id)"
              >
                <q-icon name="edit" />
              </q-btn>
              <q-btn
                color="secondary"
                label=""
                class="q-btn-xs q-mr-md"
                @click="updateUser(props.row.id)"
              >
                <q-icon name="update" />
              </q-btn>
              <q-btn
                color="negative"
                label=""
                class="q-btn-xs q-mr-md"
                @click="confirmDeleteUser(props.row.id)"
              >
                <q-icon name="delete" />
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </div>
</template>

<script>
const columns = [
  {
    name: "name",
    required: true,
    label: "Nome",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "email",
    sortable: true,
  },
  {
    name: "user_type",
    align: "center",
    label: "User Type",
    field: "user_type",
    sortable: true,
  },
];

const rows = [];

import { useQuasar } from "quasar";

import userService from "src/services/userService";

export default {
  data() {
    return {
      columns,
      rows,
    };
  },
  methods: {
    editUser(userId) {
      this.$router.push({ name: "oneUser", params: { id: userId } });
    },

    updateUser(userId) {
      this.$router.push({ name: "updateUser", params: { id: userId } });
    },

    confirmDeleteUser(userId) {
      const $q = useQuasar();

      const dialogOptions = {
        title: "Confirmar Exclusão",
        message: "Tem certeza de que deseja excluir este usuário?",
        ok: "Sim",
        cancel: "Cancelar",
      };

      $q.dialog(dialogOptions).onOk(() => {
        this.deleteUser(userId);
      });
    },

    deleteUser(userId) {
      userService
        .deleteUser(userId)
        .then(() => {
          this.users = this.users.filter((user) => user.id !== userId);
          console.log("Usuário excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir o usuário:", error);
        });
    },
  },
  mounted() {
    userService
      .getUsers()
      .then((response) => {
        this.rows = response.data;
        console.log(response);
      })
      .catch((error) => {
        console.error("Erro ao obter dados dos usuários:", error);
      });
  },
};
</script>
