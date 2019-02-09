import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';

import App from './App.vue';
import Index from './components/Index.vue';
import City from './components/City.vue';

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

const store = new Vuex.Store({
    state: {
        appKey: "d8aabd68c1841ab6e4504fe41c9e87c7",
        cityList: [
            {
                "id": 745044,
                "name": "Istanbul",
                "country": "TR",
                "coord": {
                    "lon": 28.949659,
                    "lat": 41.01384
                }
            },
            {
                "id": 2759794,
                "name": "Amsterdam",
                "country": "NL",
                "coord": {
                    "lon": 4.88969,
                    "lat": 52.374031
                }
            },
            {
                "id": 2950158,
                "name": "Berlin",
                "country": "DE",
                "coord": {
                    "lon": 10.45,
                    "lat": 54.033329
                }
            },
            {
                "id": 2643743,
                "name": "London",
                "country": "GB",
                "coord": {
                    "lon": -0.12574,
                    "lat": 51.50853
                }
            },
            {
                "id": 6455259,
                "name": "Paris",
                "country": "FR",
                "coord": {
                    "lon": 2.35236,
                    "lat": 48.856461
                }
            },
        ],
        weatherData: [],
        forecastData: {}
    },
    getters: {
        getAppKey : state => {
            return state.appKey;
        },
        getCityList: state => {
            return state.cityList;
        },
        getWeatherData: state => {
            return state.weatherData;
        },
        getForecastData: state => {
            return state.forecastData;
        }
    },
    mutations: {
        addWeatherData (state, cityWeatherData) {
            state.weatherData.push(cityWeatherData);
        },
        addForecastData (state, cityForecastData) {
            const citySlugName = cityForecastData.city.name.toLowerCase();
            state.forecastData[citySlugName] = cityForecastData;
        }
    }
});

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
        path: '/',
        component: Index
    },
    {
        path: '/city/:name',
        component: City
    },
  ]
});

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
