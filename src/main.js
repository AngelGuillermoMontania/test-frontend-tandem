import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"

// Vuetify
import "vuetify/styles"
import "material-design-icons-iconfont/dist/material-design-icons.css"
import "./assets/base.css"
import { createVuetify } from "vuetify"
import * as components from "vuetify/components"
import * as directives from "vuetify/directives"
import { aliases, md } from "vuetify/iconsets/md"

const vuetify = createVuetify({
	components,
	directives,
	icons: {
		defaultSet: "md",
		aliases,
		sets: {
			md,
		},
	},
})

const app = createApp(App)

app.use(router)

app.use(vuetify)

app.mount("#app")
