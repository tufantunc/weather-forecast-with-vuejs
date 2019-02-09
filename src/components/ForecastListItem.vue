<template>
    <li>
        <span>{{addZero(new Date(forecast.dt_txt).getHours())}}:{{addZero(new Date(forecast.dt_txt).getMinutes())}}</span>
        <span>{{Math.round(forecast.main.temp)}} °C</span>
    </li>
</template>

<script>
    export default {
        props: {
            forecast: { type: Object, required: true }
        },
        methods: {
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
    @import './../assets/main.scss'
</style>