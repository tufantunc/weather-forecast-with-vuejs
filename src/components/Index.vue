<template>
  <div class="container">
        <div class="city-list">
            <div class="city-list__city-box" 
                v-for="city in weatherData"
                v-bind:style="{ backgroundImage: `url('/static/images/${city.name.toLowerCase()}.jpg')` }"
                @click="$router.push({ path: `city/${city.name.toLowerCase()}` })">
                <div class="city-list__weather-info">
                    <div class="city-list__city-name">
                        {{Math.round(city.main.temp)}} °C<br/>
                        {{city.name}}
                    </div>
                    <img class="city-list__weather-icon" v-bind:src="`http://openweathermap.org/img/w/${city.weather[0].icon}.png`" />
                </div>
            </div>
        </div>
  </div>
</template>

<script>
    export default {
        data () {
            return {
                appKey: this.$store.getters.getAppKey,
                cityList: this.$store.getters.getCityList,
                weatherData: this.$store.getters.getWeatherData
            }
        },
        created() {
            const {appKey, weatherData} = this;
            const store = this.$store;
            if(weatherData.length === 0) {
                this.cityList.forEach(city => {
                    this.axios.get(`http://api.openweathermap.org/data/2.5/weather?id=${city.id}&appid=${appKey}&units=metric`)
                        .then(function (response) {
                            store.commit('addWeatherData', response.data);
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                });
            }
        }
    }
</script>

<style lang="scss">
    @import './../assets/main.scss';
    @import './../assets/city-list.scss';
</style>