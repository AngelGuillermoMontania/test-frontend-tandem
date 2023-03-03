<script setup>
import router from '../router';


function logOut() {
    localStorage.removeItem("token")
    router.push("/login")
}

</script>

<template>
    <v-layout>
        <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random" :elevation="11">
            <template v-slot:image>
                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
            </template>

            <v-app-bar-title style="width: fit-content;">
                <RouterLink to="/" style="padding-left: 15px;text-decoration: none; color: inherit; width: fit-content; display: flex;">
                    <v-img height="50" width="100" aspect-ratio="16/9" class="img-tandem"
                        src="https://www.tandemdigital.net/images/TandemLogo2.png"
                        style="overflow: visible;">
                    </v-img>
                </RouterLink>
            </v-app-bar-title>


            <v-btn prepend-icon="mdi-close-thick" variant="outlined" color="error" size="small" @click="logOut()">
                Cerrar sesion
            </v-btn>
        </v-app-bar>
    </v-layout>
</template>

<style>

    .img-tandem {
        transition: all 0.5s ease-in-out;
    }

    .img-tandem:hover {
        transform: scale(1.2);
    }
</style>