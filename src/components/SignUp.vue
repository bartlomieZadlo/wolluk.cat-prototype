<template lang="pug">
  v-container(fluid='')
    v-layout(row='', wrap='')
      v-flex.text-xs-center(xs12='', mt-5='')
        h1 Sign Up
      v-flex(xs12='', sm6='', offset-sm3='', mt-3='')
        form(@submit.prevent="userSignUp")
          v-layout(column='')
            v-flex
              v-text-field#email(name='email', v-model='email', label='Email', type='email', required='')
            v-flex
              v-text-field#password(name='password', v-model='password', label='Password', type='password', required='')
            v-flex
              v-text-field#confirmPassword(name='confirmPassword', v-model='passwordConfirm', label='Confirm Password', type='password', required='', :rules='[comparePasswords]')
            v-flex.text-xs-center(mt-5='')
              v-btn(color='primary', type='submit', :disabled="loading") Sign Up
            v-flex
              v-alert(type='error', dismissible='', v-model='alert') {{ error }}
            v-flex(v-if="!emailUnique")
              h1 Email already taken
</template>


<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      passwordConfirm: '',
      alert: false
    }
  },
  computed: {
    comparePasswords () {
      return this.password === this.passwordConfirm ? true : 'Passwords don\'t match'
    },
    error () {
      return this.$store.state.error
    },
    loading () {
      return this.$store.state.loading
    },
    emailUnique () {
      return this.$store.state.auth.emailUnique
    }
  },
  methods: {
    userSignUp () {
      if (this.comparePasswords !== true) {
        return
      }
      let ver = this.$store.dispatch('auth/userSignUp', {email: this.email, password: this.password, users: this.$store.state.users})
      ver.then(
        this.$store.dispatch('users/addUserToStorage', {email: this.email, password: this.password, emailUnique: this.$store.state.auth.emailUnique}))
    }
  },
  watch: {
    error (value) {
      if (value) {
        this.alert = true
      }
    },
    alert (value) {
      if (!value) {
        this.$store.commit('auth/setError', null)
      }
    }
  }
}
</script>
