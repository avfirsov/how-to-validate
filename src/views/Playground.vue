<script>
import AfterSubmitAfterSubmit from '@/components/AfterSubmitAfterSubmit';
import AfterSubmitThanImmediately from '@/components/AfterSubmitThanImmediately';
import AfterSubmitThanAfterAnyBlur from '@/components/AfterSubmitThanAfterAnyBlur';

export default {
  name: 'playground',
  components: {
    AfterSubmitAfterSubmit,
    AfterSubmitThanImmediately,
  },
  computed: {
    activeExample() {
      console.log('activeExample -> this.$route.query', this.$route.query);
      return {
        1: AfterSubmitAfterSubmit,
        2: AfterSubmitThanImmediately,
        3: AfterSubmitThanAfterAnyBlur,
      }[this.$route.query.show];
    },
  },
};
</script>

<template>
  <div class="playground">
    <component :is="activeExample" />
  </div>
</template>

<style>
.playground {
  padding-top: 100px;
}
</style>
