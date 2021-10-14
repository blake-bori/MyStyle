<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>-->
        <Header></Header>
        <router-view />
        <Footer></Footer>
    </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
export default {
    mounted() {
        // eslint-disable-next-line no-undef
        $.initialize();
    },
    components: {
        Header,
        Footer,
    },
};
</script>

<style></style>
