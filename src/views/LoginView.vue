<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "../router";

const state = reactive({
  valid: false,
  usuario: "",
  usuarioRules: [
    value => {
      if (value) return true

      return "Usuario es requerido."
    },
    value => {
      if (value.length) return true

      return "Usuario debe ser texto."
    },
    value => {
      if (value?.length >= 2 && value.length <= 50) return true

      return "Minimo 2 caracteres. Maximo 50"
    },
  ],
  password: "",
  passRules: [
  value => {
      if (value) return true

      return "Password es requerido"
    },
    value => {
      if (value.length) return true

      return "Password debe ser un texto"
    },
    value => {
      if (value.length >= 2 && value.length < 50) return true

      return "Minimo 2 caracteres. Maximo 50"
    },
  ],
  snackbar: false,
})

const onSubmit = async (event) => {
  if (state.valid) {
    try {
      const { data } = await axios.post("http://localhost:3001/user/login", {
        usuario: state.usuario,
        password: state.password
      })
      localStorage.setItem("token", JSON.stringify(`Bearer ${data.token}`))
      router.push("/")
    } catch (error) {
      state.snackbar = true
      state.usuario = ""
      state.password = ""
    }
  }
}
</script>

<template>
  <div class="d-flex justify-center mb-12">
    <v-col class="d-flex child-flex" cols="6">
      <v-img :width="50" aspect-ratio="16/9" src="https://www.tandemdigital.net/images/TandemLogo2.png"></v-img>
    </v-col>
  </div>
  <v-form v-model="state.valid" @submit.prevent="onSubmit($event)" ref="form" class="pt-12">
    <v-container>
      <v-row>
        <v-col cols="12" md="6">
          <v-text-field class="text-cyan-lighten-5" v-model="state.usuario" :rules="state.usuarioRules" :counter="10"
            label="Usuario" autocomplete="username" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field class="text-cyan-lighten-5" v-model="state.password" :rules="state.passRules" :counter="10"
            label="Password" type="password" autocomplete="current-password" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" block class="mt-2" color="blue-grey">Iniciar sesion</v-btn>
    </v-container>
  </v-form>
  <template>
    <div class="text-center">
      <v-snackbar v-model="state.snackbar">
        Usuario o contraseña invalida
      </v-snackbar>
    </div>
  </template>
</template>

<style>

</style>
