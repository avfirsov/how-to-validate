<script>
// const AFTER_SUBMIT = 'after-submit';
const IMMEDIATELY = 'immediately';
const AFTER_BLUR = 'after-blur';

// const deepGet = (object, path, returns) => {
//   return path
//     .match(/[^.[\]'`"]+/g)
//     .reduce((accumulator, value) => (accumulator && accumulator[value] ? accumulator[value] : returns), object);
// };

import { required, alpha, email, alphaNum, minLength, maxLength } from 'vuelidate/lib/validators';

//a timeout between blur event and validation exposition
const delay = 200;

export default {
  name: 'Home',
  props: {
    firstValidationTrigger: {
      type: String,
      required: true,
    },
    secondValidationTrigger: {
      type: String,
      default: 'after-blur',
    },
    hideMsgOnFocus: {
      type: Number,
      required: true,
    },
    showMsgOnBlur: {
      type: Number,
      default: 1,
    },
  },
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
  computed: {
    showMsgAfterBlur() {
      return (
        this.firstValidationTrigger == AFTER_BLUR ||
        (this.secondValidationTrigger == AFTER_BLUR && this.submitAttempted) ||
        this.firstValidationTrigger == IMMEDIATELY && this.showMsgOnBlur||
        (this.secondValidationTrigger == IMMEDIATELY && this.showMsgOnBlur && this.submitAttempted)
      );
    },
    showMsgOnInput() {
      return (
        this.firstValidationTrigger == IMMEDIATELY ||
        (this.secondValidationTrigger == IMMEDIATELY && this.submitAttempted)
      );
    },
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
    handleBlur(propName) {
      //rewrite for nested case
      if (this.showMsgAfterBlur) {
        this.$v[propName].$touch();
        setTimeout(() => this.$set(this.proxy$v[propName], '$error', this.$v[propName].$error), delay);
      }
    },
    handleFocus(propName) {
      //rewrite for nested case
      if (this.hideMsgOnFocus) {
        this.$set(this.proxy$v[propName], '$error', false);
      }
    },
    handleInput(propName) {
      if (this.showMsgOnInput) {
        this.$set(this.proxy$v, propName, JSON.parse(JSON.stringify(this.$v[propName])));
      }
    },
  },
};
</script>

<template>
  <div class="form">
    <div class="field">
      <label class="label is-large">Name</label>
      <div class="control">
        <input
          :class="['input', 'is-large', { 'is-danger': proxy$v.name.$error }]"
          type="text"
          placeholder="Name"
          v-model.trim="$v.name.$model"
          @input="handleInput('name')"
          @blur="handleBlur('name')"
          @focus="handleFocus('name')"
        />
      </div>
      <p class="help is-danger" v-if="proxy$v.name.$error && !proxy$v.name.required">Please, fill in your name</p>
      <p class="help is-danger" v-else-if="proxy$v.name.$error && !proxy$v.name.alpha">
        Name should consist only of letters
      </p>
    </div>

    <div class="field">
      <label class="label is-large">Username</label>
      <div class="control">
        <input
          :class="['input', 'is-large', { 'is-danger': proxy$v.username.$error }]"
          type="text"
          placeholder="Username"
          value="bulma"
          v-model.trim="$v.username.$model"
          @input="handleInput('username')"
          @blur="handleBlur('username')"
          @focus="handleFocus('username')"
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
      <label class="label is-large">Email</label>
      <div class="control">
        <input
          :class="['input', 'is-large', { 'is-danger': proxy$v.email.$error }]"
          type="email"
          placeholder="Email"
          value="hello@"
          v-model.trim="$v.email.$model"
          @input="handleInput('email')"
          @blur="handleBlur('email')"
          @focus="handleFocus('email')"
        />
      </div>
      <p class="help is-danger" v-if="proxy$v.email.$error && !proxy$v.email.required">Please, fill in the email</p>
      <p class="help is-danger" v-else-if="proxy$v.email.$error && !proxy$v.email.email">
        Please, enter a correct email
      </p>
    </div>

    <div class="control margin-top">
      <button class="button is-link is-large" @click="submit">Submit</button>
    </div>
  </div>
</template>
