<script setup>
import { reactive } from "vue";
import axios from "axios";
import router from "../router";

const state = reactive({
  valid: false,
  user: "",
  userRules: [
    value => {
      if (value) return true

      return "Name is requred."
    },
    value => {
      if (value?.length > 2) return true

      return "Name must be less than 10 characters."
    },
  ],
  password: "",
  passRules: [
    value => {
      if (value) return true

      return "Password is requred."
    },
    value => {
      if (value) return true

      return "Password must be valid."
    },
  ],
  snackbar: false,
})

const onSubmit = async (event) => {
  if (state.valid) {
    try {
      const data = await axios.post("http://localhost:3001/user/login", {
        usuario: state.user,
        password: state.password
      })
      localStorage.setItem("token", JSON.stringify(`Bearer ${data.data.token}`))
      router.push("/")
    } catch (error) {
      state.snackbar = true
      state.user = ""
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
          <v-text-field class="text-cyan-lighten-5" v-model="state.user" :rules="state.userRules" :counter="10"
            label="User" required></v-text-field>
        </v-col>

        <v-col cols="12" md="6">
          <v-text-field class="text-cyan-lighten-5" v-model="state.password" :rules="state.passRules" :counter="10"
            label="Password" type="password" required></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" block class="mt-2" color="blue-grey">Submit</v-btn>
    </v-container>
  </v-form>
  <template>
    <div class="text-center">
      <v-snackbar v-model="state.snackbar">
        Invalid user or password
      </v-snackbar>
    </div>
  </template>
</template>

<style>
/* @media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
} */
</style>
