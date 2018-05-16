<template>
  <v-content>
    <v-container fluid justify-center fill-height>
      <v-card class="login-container" flat wrap align-center>
        <v-card-title class="text-xs-center">
          <div class="headline">Register to Teman Diabetes Dashboard</div>
        </v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-form>
              <v-text-field
                box
                block
                name="firstName"
                label="First Name"
                color="light-blue"
                v-model="firstName"
                :error="$v.firstName.$error"
                :error-messages="firstNameErrorMessages"
                @blur="$v.firstName.$touch"
              ></v-text-field>
              <v-text-field
                box
                block
                name="lastName"
                label="Last Name"
                color="light-blue"
                v-model="lastName"
                :error="$v.lastName.$error"
                :error-messages="lastNameErrorMessages"
                @blur="$v.lastName.$touch"
              ></v-text-field>
              <v-text-field
                box
                block
                name="email"
                label="E-mail"
                color="light-blue"
                v-model="email"
                :error="$v.email.$error"
                :error-messages="emailErrorMessages"
                @blur="$v.email.$touch"
              ></v-text-field>
              <v-text-field
                box
                block
                name="password"
                label="Enter your password"
                class="m-b-5"
                color="light-blue"
                v-model="password"
                :append-icon="hidePassword ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (hidePassword = !hidePassword)"
                :type="hidePassword ? 'password' : 'text'"
                :error="$v.password.$error"
                :error-messages="passwordErrorMessages"
                @blur="$v.password.$touch"
                counter
                required
              ></v-text-field>
              <v-btn
                block
                ripple
                large
                @click="submit"
                color="indigo"
                class="mb-3"
              >
                Register
              </v-btn>
              <v-btn
                block
                ripple
                large
                color="blue"
                :to="{path:'/login'}"
              >
                Login
              </v-btn>
            </v-form>
          </v-container>
        </v-card-text>
      </v-card>
    </v-container>
  </v-content>
</template>

<script>
import { validationMixin } from 'vuelidate';
import { required, email } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  validations: {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
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
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      hidePassword: true,
    };
  },
  computed: {
    emailErrorMessages() {
      const result = [];
      if (this.$v.email.$error) {
        if (!this.$v.email.email) {
          result.push('Input must be a valid email address');
        }
        if (!this.$v.email.required) {
          result.push('Email field is required');
        }
      }
      return result;
    },
    passwordErrorMessages() {
      const result = [];
      if (this.$v.password.$error) {
        result.push('Password field is required');
      }
      return result;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
    },
  },
  name: 'Register',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.login-container {
  min-width : 300px;
  width: 36%;
}

button {
  color: #ffffff;
}
</style>
