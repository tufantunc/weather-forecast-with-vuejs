<template>
    <div class="container" v-if="cityForecastData.length > 0">
        <div class="city-detail" v-bind:style="{ backgroundImage: `url('/static/images/${citySlugName}.jpg')` }">
            <div class="city-detail__title">
                <h1>{{cityForecastData[0].city.name}}</h1>
                <router-link to="/">&#xab; Go Back</router-link>
            </div>
                <div class="city-detail__forecast-container">
                    <div class="city-detail__forecast" v-for="date in dates">
                        {{new Date(date).toLocaleDateString('en-GB', {day: 'numeric', month: 'long', year: 'numeric'})}}
                        <ul>
                            <forecast-list-item v-for="(forecast, index) in filterForecastDataByDate(cityForecastData[0].list, date)" :forecast="forecast" :key="forecast.dt" />
                        </ul>
                    </div>
                </div>
        </div>
    </div>
</template>

<script>
    import ForecastListItem from './ForecastListItem.vue';
    export default {
        data() {
            return {
                appKey: this.$store.getters.getAppKey,
                cityList: this.$store.getters.getCityList,
                citySlugName: this.$route.params.name,
                forecastData: this.$store.getters.getForecastData,
                cityForecastData: [],
                dates: []
            }
        },
        components: {
            ForecastListItem
        },
        created() {
            const {appKey, cityList, forecastData, citySlugName, axios, cityForecastData, dates, getUniqueDaysWeatherData} = this;
            if(forecastData[citySlugName]) {
                cityForecastData.push(forecastData[citySlugName]);
                var uniqueDays = getUniqueDaysWeatherData(forecastData[citySlugName]);
                uniqueDays.forEach(element => dates.push(element));
            } else {
                const selectedCity = cityList.find(city => city.name.toLowerCase() === citySlugName);
                const store = this.$store;
                axios.get(`http://api.openweathermap.org/data/2.5/forecast?id=${selectedCity.id}&appid=${appKey}&units=metric`)
                    .then(function (response) {
                        store.commit('addForecastData', response.data);
                        cityForecastData.push(response.data);
                        var uniqueDays = getUniqueDaysWeatherData(response.data);
                        uniqueDays.forEach(element => dates.push(element));
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        methods: {
            getUniqueDaysWeatherData: (cityForecastData) => {
                let dateList = [];
                cityForecastData.list.forEach(element => {
                    const date = new Date(element.dt_txt);
                    const dateString = date.toDateString();
                    if(dateList.indexOf(dateString) === -1) {
                        dateList.push(dateString);
                    }
                });
                return dateList;
            },
            filterForecastDataByDate: (data, date) => {
                const dateObj = new Date(date).toDateString();
                
                return data.filter(item => new Date(item.dt_txt).toDateString() === dateObj);
            },
            addZero: (i) => {
                if (i < 10) {
                    i = "0" + i;
                }
                return i;
            }
        }
    }
</script>

<style lang="scss">
    @import './../assets/main.scss';
    @import './../assets/city-detail.scss';
</style>