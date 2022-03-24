<template>
    <div class="myInformation">
        <MyInfoComponent></MyInfoComponent>
    </div>
</template>

<script>
// @ is an alias to /src
import MyInfoComponent from "@/components/myPage/MyInfoComponent.vue";

export default {
    name: "MyInfo",
    components: {
        MyInfoComponent,
    },
    mounted() {
        // 페이지를 열 때 마이페이지 관련 데이터를 불러옴
        this.$store.dispatch("getMyInfoData", this.$store.state.user.user.userIdx);
    },
};
</script>
