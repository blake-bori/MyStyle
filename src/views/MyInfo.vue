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
};
</script>
