<script>
import moment from 'moment'
export default {
  name: 'eventsList',
  props: {
    date: Object,
    filteredEvents: Array
  },
  // beforeCreate() {
  //   console.log("beforeCreate EventsList")
  // },
  // created() {
  //   console.log("created EventsList")
  // },
  // beforeMount() {
  //    console.log("beforeMount EventsList")
  // },
  // mounted() {
  //   console.log("mounted EventsList")
  // },
  // beforeUpdate() {
  //    console.log("beforeUpdate EventsList")
  // },
  // updated () {
  //   console.log("updated EventsList")
  // },
  methods: {
    summary: function (t) {
      let words = t.split(' ');
      return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '') 
    },
    f: function (d) {
      return moment(d).format("HH:mm")
    }
  },
  data () {
    return {    
    }
  }
}
</script>

<template>
  <div id="eventsList">    
    <div class="container" v-if="filteredEvents.length == 0">
      <div class="row">
        <h3>No events found for today</h3>
      </div>
    </div>
    <div class="container" v-bind="filteredEvents" v-for="(x, i) in filteredEvents" v-bind:key="i">    
      <div class="row">
        <h3>{{ x.name.text }}</h3>
        <div class="description">
          <div>starts: {{ f(x.start.local) }}, ends {{ f(x.end.local) }}</div>
          {{ summary(x.description.text) }}
          <a :href="x.url">[more info]</a>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
  h3, .description {
    text-align: left;
  }
  #eventsList .row {
    padding: 20px 0;
  }
</style>
