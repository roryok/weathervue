<script>
export default {
  name: 'hello',
  props: {
    msg: String
  },
  data () {
    return {
    }
  }
}
</script>

<template>
  <div class="hello">
    <span>{{ msg }}</span>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-style: italic;
}
</style>
