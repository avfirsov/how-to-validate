<script>
import { required, alpha, email, alphaNum, minLength, maxLength } from 'vuelidate/lib/validators';

//a timeout between blur event and validation exposition
const delay = 200;

export default {
  name: 'Home',
  validations() {
    return {
      name: { required, alpha },
      username: { required, alphaNum, minLength: minLength(3), maxLength: maxLength(20) },
      email: { required, email },
    };
  },
  data() {
    return {
      name: '',
      username: '',
      email: '',
      proxy$v: {},
      submitAttempted: false,
    };
  },
  beforeMount() {
    this.proxy$v = JSON.parse(JSON.stringify(this.$v));
  },
  methods: {
    submit() {
      this.submitAttempted = true;
      this.$v.$touch();
      this.proxy$v = JSON.parse(JSON.stringify(this.$v));
    },
    handleBlur() {
      if (this.submitAttempted) {
        setTimeout(() => (this.proxy$v = JSON.parse(JSON.stringify(this.$v))), delay);
      }
    },
  },
};
</script>

<template>
  <div class="form">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input
          :class="['input', { 'is-danger': proxy$v.name.$error }]"
          type="text"
          placeholder="Name"
          v-model.trim="$v.name.$model"
          @blur="handleBlur($event)"
        />
      </div>
      <p class="help is-danger" v-if="proxy$v.name.$error && !proxy$v.name.required">Please, fill in your name</p>
      <p class="help is-danger" v-else-if="proxy$v.name.$error && !proxy$v.name.alpha">
        Name should consist only of letters
      </p>
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          :class="['input', { 'is-danger': proxy$v.username.$error }]"
          type="text"
          placeholder="Username"
          value="bulma"
          v-model.trim="$v.username.$model"
          @blur="handleBlur($event)"
        />
      </div>
      <p class="help is-danger" v-if="proxy$v.username.$error && !proxy$v.username.required">
        Please, fill in the username
      </p>
      <p class="help is-danger" v-else-if="proxy$v.username.$error && !proxy$v.username.alphaNum">
        Username should only contain letters and/or digits
      </p>
      <p class="help is-danger" v-else-if="proxy$v.username.$error && !proxy$v.username.minLength">
        Should consist at least of 3 symbols
      </p>
      <p class="help is-danger" v-else-if="proxy$v.username.$error && !proxy$v.username.maxLength">
        Should have no more than 20 symbols
      </p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          :class="['input', { 'is-danger': proxy$v.email.$error }]"
          type="email"
          placeholder="Email"
          value="hello@"
          v-model.trim="$v.email.$model"
          @blur="handleBlur($event)"
        />
      </div>
      <p class="help is-danger" v-if="proxy$v.email.$error && !proxy$v.email.required">Please, fill in the email</p>
      <p class="help is-danger" v-else-if="proxy$v.email.$error && !proxy$v.email.email">
        Please, enter a correct email
      </p>
    </div>

    <div class="control">
      <button class="button is-link" @click="submit">Submit</button>
    </div>
  </div>
</template>
