<script>
import ValidatedForm from './ValidatedForm';

export default {
  name: 'Constructor',
  components: {
    ValidatedForm,
  },
  data() {
    return {
      formKey: 1,
      firstValidationTrigger: null,
      secondValidationTrigger: null,
      hideMsgOnFocus: null,
    };
  },
  computed: {
    choice() {
      return '' + this.firstValidationTrigger + this.secondValidationTrigger + this.hideMsgOnFocus;
    },
    showForm() {
      return Number.isInteger(this.hideMsgOnFocus);
    },
  },
  watch: {
    choice() {
      this.formKey += 1;
    },
    firstValidationTrigger() {
      this.secondValidationTrigger = null;
      this.hideMsgOnFocus = null;
    },
    showForm(val) {
      if (val) {
        this.$scrollTo(this.$refs.bottom, 500, {
          container: document.querySelector('html'),
          easing: 'ease-in',
          offset: -60,
          force: true,
          cancelable: true,
        });
      }
    },
  },
};
</script>

<template>
  <div class="constructor">
    <section class="section">
      <div class="container">
        <h1 class="title is-1">Configure your form validation</h1>
      </div>
    </section>
    <section class="section">
      <div class="container">
        <div class="field">
          <label class="subtitle is-3 margin-top"
            >At witch moment would you like to show user an error message if it occur?</label
          >
          <div class="control margin-top__small">
            <div class="select is-large">
              <select v-model="firstValidationTrigger">
                <option :value="null">Please select an option</option>
                <option value="after-submit">After form submit</option>
                <option value="after-blur">After user blured from the input where error occured</option>
                <option value="immediately">Immediately after error occur</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="field margin-top"
          v-if="firstValidationTrigger == 'after-submit' || firstValidationTrigger == 'after-blur'"
        >
          <label class="subtitle is-3"
            >If user tried to correct error but failed, at witch moment subsequent error should be shown?</label
          >
          <div class="control margin-top__small">
            <div class="select is-large">
              <select v-model="secondValidationTrigger">
                <option :value="null">Please select an option</option>
                <option value="after-submit" v-if="firstValidationTrigger != 'after-blur'"
                  >Like before, after form submit</option
                >
                <option value="after-blur">After user blured from the input where subsequent error occured</option>
                <option value="immediately">Immediately after error occur</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="field margin-top"
          v-if="(firstValidationTrigger && firstValidationTrigger != 'after-submit') || secondValidationTrigger"
        >
          <label class="subtitle is-3"
            >When user focus in the input that already contains error, should error be hidden?</label
          >
          <div class="control margin-top__small">
            <div class="select is-large">
              <select v-model="hideMsgOnFocus">
                <option :value="null">Please select an option</option>
                <option :value="1">Yes, hide error message when field is focused</option>
                <option :value="0">No, let error be shown, even when field is focused</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section centered" v-if="showForm">
      <h1 class="title is-1 has-text-centered">Your form is ready, have fun!</h1>
      <div class="container">
        <validated-form
          :key="formKey"
          :firstValidationTrigger="firstValidationTrigger"
          :secondValidationTrigger="secondValidationTrigger"
          :hideMsgOnFocus="hideMsgOnFocus"
        />
      </div>
    </section>
    <div ref="bottom"></div>
  </div>
</template>

<style>
.margin-top {
  margin-top: 40px;
}
.margin-top__small {
  margin-top: 20px;
}

.centered {
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>
