<script>
import { required, alpha, email, alphaNum, minLength, maxLength } from 'vuelidate/lib/validators';

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
      submitAttempted: false
    };
  },
  methods: {
    submit() {
      this.$v.$touch();
      this.submitAttempted = true;
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
          :class="['input', { 'is-danger': submitAttempted && $v.name.$error }]"
          type="text"
          placeholder="Name"
          v-model.trim="$v.name.$model"
        />
      </div>
      <p class="help is-danger" v-if="submitAttempted && $v.name.$error && !$v.name.required">Please, fill in your name</p>
      <p class="help is-danger" v-else-if="submitAttempted && $v.name.$error && !$v.name.alpha">
        Name should consist only of letters
      </p>
    </div>

    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input
          :class="['input', { 'is-danger': submitAttempted && $v.username.$error }]"
          type="text"
          placeholder="Username"
          value="bulma"
          v-model.trim="$v.username.$model"
        />
      </div>
      <p class="help is-danger" v-if="submitAttempted && $v.username.$error && !$v.username.required">
        Please, fill in the username
      </p>
      <p class="help is-danger" v-else-if="submitAttempted && $v.username.$error && !$v.username.alphaNum">
        Username should only contain letters and/or digits
      </p>
      <p class="help is-danger" v-else-if="submitAttempted && $v.username.$error && !$v.username.minLength">
        Should consist at least of 3 symbols
      </p>
      <p class="help is-danger" v-else-if="submitAttempted && $v.username.$error && !$v.username.maxLength">
        Should have no more than 20 symbols
      </p>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input
          :class="['input', { 'is-danger': submitAttempted && $v.email.$error }]"
          type="email"
          placeholder="Email"
          value="hello@"
          v-model.trim="$v.email.$model"
        />
      </div>
      <p class="help is-danger" v-if="submitAttempted && $v.email.$error && !$v.email.required">Please, fill in the email</p>
      <p class="help is-danger" v-else-if="submitAttempted && $v.email.$error && !$v.email.email">
        Please, enter a correct email
      </p>
    </div>

    <div class="control">
      <button class="button is-link" @click="submit">Submit</button>
    </div>
  </div>
</template>
