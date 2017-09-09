
const parseString = require('xml2js').parseString;
const moment = require('moment');
const Req = require('request');

module.exports = {

  // bypass CORS issues this way
  getLocation: (request, reply) => {
    let ip = request.connection.remoteAddress;
    ip = (ip == '127.0.0.1' ? '77.95.165.9' : ip)
    let url = `https://freegeoip.net/json/${ip}`
    return reply(JSON.stringify( { url, request.connection } ));
    Req(url, (err, response, json) => {
      if (err) throw err;
      return reply(json.replace('Connaught','Connacht'));             
    })
  },

  // do a get request to the yr.no API
  getWeather: (request, reply) => {
    let 
      city = request.params.city, 
      country = request.params.country, 
      region = request.params.region;
  
    let url = `http://www.yr.no/place/${country}/${region}/${city}/forecast.xml`;
    Req(url, (err, response, xml) => {
      if (err) throw err;
      parseString(xml, (err, json) => {
        if (err) throw err;
        return reply(json);
      })       
    })
  },

  getEvents: (request, reply) => {      
    let 
      city = request.params.city, 
      country = request.params.country, 
      start = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss') + 'Z', 
      end = moment(new Date()).add(7, 'day').format('YYYY-MM-DDTHH:mm:ss') + 'Z', 
      eventBriteOAuthtoken = "5O6H4R42ZY6L73QTJYYR";

    let url = `https://www.eventbriteapi.com/v3/events/search/?location.address=${city + ',' + country}&location.within=50km&start_date.range_start=${start}&start_date.range_end=${end}&token=${eventBriteOAuthtoken}`;
  
    Req(url, function (err, response, eventsJSON) {
      if (err) throw err;
      // turn the returned JSON into a javascript object and return it
      return reply(eventsJSON);
    });
  }

}



