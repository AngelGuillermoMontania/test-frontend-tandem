<template>
    <v-layout>
        <v-app-bar color="teal-darken-4" image="https://picsum.photos/1920/1080?random" :elevation="11">
            <template v-slot:image>
                <v-img gradient="to top right, rgba(19,84,122,.8), rgba(128,208,199,.8)"></v-img>
            </template>

            <v-app-bar-title style="width: fit-content;">
                <RouterLink to="/" style="text-decoration: none; color: inherit; width: fit-content; display: flex;">
                    <v-img height="50" width="100" aspect-ratio="16/9"
                        src="https://www.tandemdigital.net/images/TandemLogo2.png">
                    </v-img>
                </RouterLink>
            </v-app-bar-title>


            <v-btn prepend-icon="close" variant="outlined" color="error" size="small">
                Cerrar sesion
            </v-btn>
        </v-app-bar>
    </v-layout>
</template>