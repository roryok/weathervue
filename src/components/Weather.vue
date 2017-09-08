<template>
  <div id="weather">


    <div class="row" v-if="filteredWeather.length < 4">
      <div class="col"></div>
      <div class="col" v-for="(f, i) in filteredWeather" v-bind:key="i">            
        <div class="row">
          <div style="width:100px;">
            <weicon :type="f.symbol.var"></weicon>
          </div>
          <div class="col weather-info">
            <div v-if="i == 0 && selectedDate.isSame(new Date(), 'day')">NOW</div>
            <div>{{ f.from.format("ha") }} - {{ f.to.format("ha") }}</div>
            <div>{{ f.symbol.name }} </div>    
          </div>
        </div>
      </div>      
      <div class="col"></div>
    </div>

    <div class="row" v-if="filteredWeather.length > 3">
      <div class="col" v-for="(f, i) in filteredWeather" v-bind:key="i">            
        <div class="row">
          <div style="width:100px;">
            <weicon :type="f.symbol.var"></weicon>
          </div>
          <div class="col weather-info">
            <div v-if="i == 0 && selectedDate.isSame(new Date(), 'day')">NOW</div>
            <div>{{ f.from.format("ha") }} - {{ f.to.format("ha") }}</div>
            <div>{{ f.symbol.name }} </div>    
          </div>
        </div>
      </div>    
    </div>      

  </div>
</template>

<script>
import weicon from '../components/Icon.vue'
import moment from 'moment'
export default {
  name: 'weather',
  components: { weicon },
  props: {
    filteredWeather: Array,
    selectedDate: Object
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .weather-info {
    padding: 15px; text-align: left;
  }
</style>
