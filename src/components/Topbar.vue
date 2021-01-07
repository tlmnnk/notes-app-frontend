<template>
  <nav class="topbar__nav">
    <div class="container">
      <div class="topbar">
        <h1 class="topbar__logo" @click="logoClick">Notes-app</h1>
        <div v-if="isLoggedIn" class="topbar__user">
          <p class="topbar__login">{{ getUser.email }}</p>
          <el-button class="topbar__logout" @click="logoutUser">Logout</el-button>
        </div>
        <div v-else class="topbar__user">
          <router-link class="topbar__link" :to="{ name: 'Registration' }">
            Registration
          </router-link>
          <router-link class="topbar__link topbar__link-login" :to="{ name: 'Login' }"
            >Login</router-link
          >
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Topbar',
  computed: {
    ...mapGetters('auth', ['isLoading', 'getUser', 'getErrors', 'isLoggedIn']),
  },
  methods: {
    ...mapActions('auth', ['logout']),
    logoutUser() {
      this.logout()
    },
    logoClick() {
      if (this.$route.name !== 'Tasks') {
        this.$router.push({ name: 'Tasks' })
      }
    },
  },
}
</script>

<style>
.topbar__nav {
  border-bottom: solid 1px #e6e6e6;
  margin-bottom: 25px;
}
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.topbar__logo {
  cursor: pointer;
}
.topbar__user {
  display: flex;
  justify-content: space-between;
}
.topbar__logout {
  margin-left: 15px !important;
}
.topbar__link {
  font-size: 1.2rem;
  color: #000;
  text-decoration: none;
}
.topbar__link-login {
  margin-left: 15px;
}
.topbar__link:hover {
  text-decoration: underline;
}
.el-menu--horizontal:focus {
  /* remove element-ui outline */
  outline: none !important;
}
</style>
