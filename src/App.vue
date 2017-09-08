<template>
  <div :style="appstyle">
    <div id="app" class="container">
      <sub>WeatherVue</sub>
      <!-- 
      <div class="row">        
        <div class="col">&nbsp;</div>
        <div class="col">        
          <input class="form-control" type="text" v-bind="city" :value="city" placeholder="enter city" />
        </div>
        <div class="col">        
          <input class="form-control" type="text" v-bind="country" :value="country" placeholder="enter country" />
        </div>
        <div class="col">&nbsp;</div>
      </div> -->

      <h1 v-if="city">{{ city }}, {{ country }}, {{ selectedDate.isSame(this.today, 'day') ? "Today" : selectedDate.format("dddd, Do MMM") }}</h1>

      <div class="dates">
        <span v-for="(x, i) in dates" v-bind:key="i">
          <a v-on:click.stop="changeDate(x.date)" href='#' v-bind:class="x.date.isSame(selectedDate, 'day') ? 'active' : ''">{{ x.text }}</a>
          <span v-if="i < 6">&nbsp;|&nbsp;&nbsp;</span>
        </span>
      </div>

      <weather :filteredWeather="filteredWeather" :selectedDate="selectedDate"></weather>

      <eventsList :filteredEvents="filteredEvents"></eventsList>

    </div>
  </div>
</template>

<script>
import moment from 'moment'
import hello from './components/Hello.vue'
import eventsList from './components/EventsList.vue'
import weather from './components/Weather.vue'
export default {
  name: 'app',
  components: { hello, eventsList, weather },
  methods: {    

    getIp: function (callback) {

      console.log("main.js methods -> getIp")
  
      this.$http.get('/location').then(response => {
        console.log('response from /location', response)
        // get body data
        this.location = JSON.parse(response.body);
        this.city = this.location.city;
        this.country = this.location.country_name
        callback(null, this.location);
      })
    },

    fetchEvents: function(location) {
      console.log("fetching events for", location.city, location.country_name)
      // path: '/events/get/{country}/{city}',
      this.$http.get(`/events/get/${location.country_name}/${location.city}`).then(response => {
        // get body data
        this.events = response.body.events; 
        this.filterEvents();
      }, response => {
        // error callback
      });
    },

    filterEvents: function() {
      this.filteredEvents = this.events.filter((x) => {
        return moment(x.start.local).isSame(this.selectedDate, 'day');
      })  
    },

    fetchWeather: function(location) {
      // path: '/weather/get/{country}/{region}/{city}',
      try{
        let url = `/weather/get/${location.country_name}/${location.region_name.replace(' ','_')}/${location.city}`;
        console.log("fetching weather for", url)
        this.$http.get(url).then(response => {
          // get body data
          this.weather = response.body.weatherdata.forecast[0].tabular[0].time.map((x) => { return {          
            from: moment(x.$.from), 
            to: moment(x.$.to),
            precipitation: x.precipitation[0].$.value,
            symbol: x.symbol[0].$,
            temperature: x.temperature[0].$,
            windDirection: x.windDirection[0].$,
            windSpeed: x.windSpeed[0].$
          }})
          this.filterWeather();
        }, error => {
          // error callback
          console.error(error)
        });
      }
      catch(error)
      {
        console.error(error)
      }
    },

    filterWeather: function () {      
      this.filteredWeather = this.weather.filter((x) => {
        return moment(x.from).isSame(this.selectedDate, 'day');
      })  
    },

    changeDate : function (newDate) {
      this.selectedDate = newDate;      
      this.filterWeather();
      this.filterEvents();
    },

    setDates: function () {
      // build dates
      this.dates = [];      
      for (let i = 0; i < 7; i++) {        
        let m = moment(new Date());
        m.add(i, 'day');
        this.dates.push({ 
          date: m,
          text: (m.isSame(this.today, 'day') ? 'Today' : (m.isSame(this.tomorrow, 'day') ? 'Tomorrow' : m.format('dddd')))  
        });        
      }
    }  
  },
  created () { 
    this.setDates();    
    this.getIp((err, location) => {
      this.fetchEvents(location);  
      this.fetchWeather(location); 
    })    
  },
  computed: {
    // a computed getter
    reversedMessage: function () {
      // `this` points to the vm instance
      return this.msg.split('').reverse().join('')
    }
  },
  data () {
    return {
      counter: 0,
      tab: 'events',
      today: moment(new Date()),
      tomorrow: moment(new Date()).add(1, 'day'),
      selectedDate: moment(new Date()),
      todoList: [
        '✔ fix weather styles',
        '✔ convert all icons for weather',
        '✔ get fetching events working',
        '✔ get events displaying correctly',
        '✔ get events displaying neatly',
        '✔ changing dates should change events',
        '✔ clean up the layout - weather icons all over the place',
        '? change background based on weather time',
        '- get a nice background image of sligo in there',
        '- move bootstrap from node_modules to its own folder',
        '✘ use browser location',
        '✔ set location as a variable',
        '? allow location to be set manually',
        '? find some other events sources'
      ],
      appstyle: {},
      flip: false,
      city: null,
      country: null,
      region: null,
      events: [],
      filteredEvents: [],
      weather: [],
      filteredWeather: [],
      dates : [],
      memsg: 'is it me you\'re looking for?'
    }
  }
}
</script>

<style>

#app {
  font-family: 'Calibri', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  padding-top: 50px;
  text-shadow: 2px 2px 8px #222;
}

.dates .active {    
  text-transform: uppercase;
  color: #fff;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
