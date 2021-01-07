import Vue from 'vue'
import { Button, Form, FormItem, Menu, Input, Card } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import lang from 'element-ui/lib/locale/lang/en'
import locale from 'element-ui/lib/locale'

locale.use(lang)

Vue.use(Button, { locale })
Vue.use(Form, { locale })
Vue.use(FormItem, { locale })
Vue.use(Menu, { locale })
Vue.use(Input, { locale })
Vue.use(Card, { locale })
