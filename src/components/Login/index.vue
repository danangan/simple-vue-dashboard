<template>
  <v-content>
    <v-container fluid justify-center fill-height>
      <v-card class="login-container px-5 py-4 elevation-2" flat wrap align-center>
        <v-card-title class="text-xs-center py-1">
          <span class="login-title">
            INVENTORY MANAGEMENT SYSTEM
          </span>
        </v-card-title>
        <v-card-text class="py-0">
            <v-form>
              <v-text-field
                box
                block
                name="email"
                label="E-mail"
                v-model="email"
                :error="$v.email.$error"
                :error-messages="emailErrorMessages"
                @blur="$v.email.$touch"
                @keyup.enter="submit"
              ></v-text-field>
              <v-text-field
                box
                block
                name="password"
                label="Enter your password"
                class="m-b-5"
                v-model="password"
                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (hidePassword = !hidePassword)"
                :type="hidePassword ? 'password' : 'text'"
                :error="$v.password.$error"
                :error-messages="passwordErrorMessages"
                @blur="$v.password.$touch"
                @keyup.enter="submit"
                counter
                required
              ></v-text-field>
              <v-checkbox
                label="Keep me signed in"
                v-model="keepMeSignedIn"
              ></v-checkbox>
              <v-btn
                block
                ripple
                large
                dark
                @click="submit"
                color="primary"
                class="mb-3"
                :loading="loading"
              >
                Login
              </v-btn>
              <!-- <v-btn
                block
                ripple
                large
                color="indigo"
                :to="{path:'/register'}"
              >
                Register
              </v-btn> -->
            </v-form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';
import logo from '@/assets/logo_full.png';
// import { result } from 'lodash';

export default {
  mixins: [validationMixin],
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
  data() {
    return {
      email: '',
      password: '',
      hidePassword: true,
      loading: false,
      keepMeSignedIn: false,
      logo,
    };
  },
  computed: {
    emailErrorMessages() {
      const data = [];
      if (this.$v.email.$error) {
        if (!this.$v.email.email) {
          data.push('Input must be a valid email address.');
        }
        if (!this.$v.email.required) {
          data.push('Email field is required.');
        }
      }
      return data;
    },
    passwordErrorMessages() {
      const data = [];
      if (this.$v.password.$error) {
        data.push('Password field is required.');
      }
      return data;
    },
  },
  methods: {
    submit() {
      const that = this;

      // invoke the error hanlder
      that.$v.$touch();

      if (!that.$v.$error) {
        that.loading = true;

        const loginData = {
          email: that.email,
          password: that.password,
          keepMeSignedIn: that.keepMeSignedIn,
        };

        that.$store.dispatch('login', [loginData, () => {
          that.loading = false;
        }]);
      }
    },
  },
  name: 'Login',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="stylus"scoped>
  .login-title
    font-size 22px

  h1, h2
    font-weight normal

  ul
    list-style-type none
    padding 0

  li
    display inline-block
    margin 0 10px

  a
    color #42b983

  .login-container
    min-width 300px
    width 36%

  button
    color #ffffff

</style>
