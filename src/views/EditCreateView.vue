<script setup>
import { onMounted, reactive } from "vue";
import Header from "../components/Header.vue";
import axios from "axios";
import router from "../router/index"
import { useRoute } from "vue-router"

const route = useRoute()

const state = reactive({
  id: null,
  valid: false,
  nombreYApellido: "",
  nombreYApellidoRules: [
    value => {
      if (value) return true
      return "Nombre y apellido es requerido."
    },
    value => {
      if (value.length) return true

      return "Nombre y apellido debe ser texto."
    },
    value => {
      if (value?.length >= 5 && value.length <= 50) return true

      return "Minimo 5 caracteres. Maximo 50"
    },
  ],
  dni: "",
  dniRules: [
    value => {
      if (value) return true

      return "DNI es requerido."
    },
    value => {
      if(Number(value)) return true

      return "El DNI debe ser un numero"
    },
    value => {
      if (value < 100000000 && value > 10000000) return true

      return "El DNI no es valido. "
    },
  ],
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
  email: "",
  emailRules: [
    value => {
      if (value) return true

      return "Email es requerido."
    },
    value => {
      if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) return true

      return "No es un email valido."
    },
  ],
  telefono: "",
  telefonoRules: [
    value => {
      if (value) return true

      return "Telefono es requerido."
    },
    value => {
      if(Number(value)) return true

      return "Telefono debe ser un numero"
    },
    value => {
      if (value < 2147483647 && value > 1000000) return true

      return "No es un telefono valido, sin codigo de area"
    },
  ],
  password: "",
  passwordRules: [
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

onMounted(async () => {
  try {
    if(!localStorage.getItem("token")) { // If you do not have a token, you reject the promise
      new Promise.reject()
    }
    if(route.query.id) { // If id exists in the query, it is edicion
      const {data} = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/${route.query.id}`, {
        headers: {
          "Authorization": JSON.parse(localStorage.getItem("token"))
        }
      })
      state.users = data
      state.id = route.query.id
      state.nombreYApellido = data.nombreYApellido
      state.usuario = data.usuario
      state.email = data.email
      state.telefono = data.telefono
      state.password = data.password
    }
  } catch (error) {
    router.push("/")
  }
})



const onSubmit = async (event) => {
  if (state.valid || state.valid === null && route.query.id) { // Valid at startup has a value of null, I make sure it does not fail.
    try {
      if (route.query.id) {  // Edit
        const data = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/user/${state.id}`, {
          nombreYApellido: state.nombreYApellido,
          usuario: state.usuario,
          email: state.email,
          telefono: Number(state.telefono),
          password: state.password
        }, {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
      } else {  // Create
        const data = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/user`, {
          nombreYApellido: state.nombreYApellido,
          usuario: state.usuario,
          email: state.email,
          dni: Number(state.dni),
          telefono: Number(state.telefono),
          password: state.password
        }, {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
      }
      router.push("/")
    } catch (error) {
      state.snackbar = true
    }
  }
}

</script>

<template>
  <Header />
  <v-form v-model="state.valid" @submit.prevent="onSubmit()" ref="form" class="pt-12 mt-12">
    <v-chip
      class="ma-2"
      color="cyan"
      size="large"
      label
      v-if="state.id" 
    >
      <v-icon start icon="mdi-pencil"></v-icon>
      Editando...
    </v-chip>
    <v-chip
      class="ma-2"
      color="cyan"
      size="large"
      label
      v-else
    >
      <v-icon start icon="mdi-account-plus"></v-icon>
      Creando...
    </v-chip>
    <v-container>
      <v-row>
        <v-col cols="12" :md="12" v-if="state.id">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.nombreYApellido" 
            :rules="state.nombreYApellidoRules"
            :counter="10" 
            label="Nombre y apellido" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" :md="6" v-else>
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.nombreYApellido" 
            :rules="state.nombreYApellidoRules"
            :counter="10" 
            label="Nombre y apellido" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6" v-if="!state.id">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.dni" 
            :rules="state.dniRules" 
            :counter="10" 
            label="DNI"
            type="number" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.usuario" 
            :rules="state.usuarioRules" 
            :counter="10"
            label="Usuario" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.email" 
            :rules="state.emailRules" 
            :counter="10"
            label="Email" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.telefono" 
            :rules="state.telefonoRules" 
            :counter="10"
            label="Telefono" 
            type="number" 
            required
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field 
            class="text-cyan-lighten-5" 
            v-model="state.password" 
            :rules="state.passwordRules" 
            :counter="10"
            label="Password" 
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <v-btn type="submit" block class="mt-2" color="blue-grey">Guardar</v-btn>
    </v-container>
  </v-form>
  <template>
    <div class="text-center">
      <v-snackbar v-model="state.snackbar">
        Error. Revise no tener ya un usuario con el mismo email, telefono o dni
      </v-snackbar>
    </div>
  </template>
</template>