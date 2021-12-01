<template>
    <div class="home">
        <HomeComponent></HomeComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import HomeComponent from "@/components/home/HomeComponent.vue";
// import * as homeApi from "@/api/shop";
export default {
    name: "Home",
    components: {
        HomeComponent,
    },
    mounted() {
        this.$store.dispatch("getHomeData");
    },
    data() {
        return {};
    },
    methods: {},
};
</script>
