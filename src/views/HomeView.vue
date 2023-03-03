<script setup>
import { onMounted, reactive } from "vue";
import Header from "../components/Header.vue";
import axios from "axios";
import router from "../router/index"




onMounted(async () => {
    try {
        const { data } = await axios.get("http://localhost:3001/user", {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
        state.users = data
        state.copyUsers = data
    } catch (error) {
        router.push("/login")
    }
})

const state = reactive({
    snackbar: false,
    users: [],
    copyUsers: [],
    search: '',
    dialog: false,
    dialogDelete: false,
    headers: [
        {
            title: 'NOMBRE Y APELLIDO',
            align: 'start',
            sortable: true,
            key: 'nombreYApellido',
        },
        {
            title: 'DNI',
            key: 'dni',
        },
        {
            title: 'USUARIO',
            key: 'usuario',
        },
        {
            title: 'EMAIL',
            key: 'email',
        },
        {
            title: 'TELEFONO',
            key: 'telefono',
        },
        { title: 'PASSWORD', key: 'password' },
        { title: 'Actions', key: 'actions', sortable: false },
    ],
    ruleSearch: [
        value => {
            if (value) {
                state.copyUsers = state.users.filter(
                    user =>
                        user.nombreYApellido.toLowerCase().includes(value.toLowerCase()) ||
                        String(user.dni).includes(value.toLowerCase()) ||
                        user.usuario.toLowerCase().includes(value.toLowerCase()) ||
                        user.email.toLowerCase().includes(value.toLowerCase()) ||
                        String(user.telefono).includes(value.toLowerCase()) ||
                        user.password.toLowerCase().includes(value.toLowerCase())
                )
            } else {
                state.copyUsers = state.users
            }
        }
    ],
    editedId: -1,
    deletedId: -1
})

const editItem = (item) => {
    state.editedId = item.id
    router.push(`/createEdit?id=${item.id}`)
}

const deleteItem = (item) => {
    state.deletedId = item.id
    state.dialogDelete = true
}

const deleteItemConfirm = async () => {
    try {
        const dataDelete = axios.delete(`http://localhost:3001/user/${state.deletedId}`, {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
        const dataGet = await axios.get("http://localhost:3001/user", {
            headers: {
                "Authorization": JSON.parse(localStorage.getItem("token"))
            }
        })
        state.users = dataGet.data
        state.copyUsers = dataGet.data
        state.dialogDelete = false
    } catch (error) {
        state.snackbar = true
        state.dialogDelete = false
    }
}

const newUser = () => {
    router.push("/createEdit")
}

</script>

<template>
    <Header />
    <div v-if="state.users == []" d-flex>
        <v-progress-circular indeterminate color="primary" model-value="20" :size="62" :width="12"></v-progress-circular>
    </div>
    <div v-else class="d-flex justify-center flex-column align-center mt-16 pt-16">
        
        <v-text-field v-model="state.search" :rules="state.ruleSearch" append-icon="mdi-magnify" label="Buscar" single-line
            class="w-50"></v-text-field>
        <v-table fixed-header fixed-footer height="600px" theme="dark" class="elevation-11 mb-16">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>USUARIOS</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>

                    <v-btn color="primary" dark class="mb-2" prepend-icon="mdi-account-plus" @click="newUser">
                        Nuevo usuario
                    </v-btn>
                    <v-dialog v-model="state.dialogDelete" max-width="700px">
                        <v-card>
                            <v-card-title class="text-h5 text-center">¿Estas seguro deseas eliminar a este usuario?</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="blue-darken-1" variant="text" @click="state.dialogDelete = false">Cancelar</v-btn>
                                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">SI</v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <thead class="elevation-14">
                <tr>
                    <th class="text-left">
                        Nombre y Apellido
                    </th>
                    <th class="text-left">
                        DNI
                    </th>
                    <th class="text-left">
                        Usuario
                    </th>
                    <th class="text-left">
                        Email
                    </th>
                    <th class="text-left">
                        Telefono
                    </th>
                    <th class="text-left">
                        Contraseña
                    </th>
                    <th class="text-center">
                        Acciones
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in state.copyUsers" :key="user.id">
                    <td>{{ user.nombreYApellido }}</td>
                    <td>{{ user.dni }}</td>
                    <td>{{ user.usuario }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.telefono }}</td>
                    <td>{{ user.password }}</td>
                    <td class="d-flex justify-space-around align-center">
                        <v-icon size="small" icon="mdi-pencil" @click="editItem(user)" />
                        <v-icon size="small" icon="mdi-delete" @click="deleteItem(user)" />
                    </td>
                </tr>
            </tbody>
        </v-table>

    </div>
    <template>
        <div class="text-center">
            <v-snackbar v-model="state.snackbar">
                The user could not be deleted
            </v-snackbar>
        </div>
    </template>
    
</template>
