<template>
    <div>
        <h5>User Info</h5>
        <ul>
            <li v-for="i in info" :key="i.id">
                <span>{{ i.name }}</span>
                <br />
                <span>{{ i.rate }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            info: [],
        };
    },
    methods: {
        getData() {
            axios.get("/api/info").then((response) => {
                this.info = response.data;
            });
        },
    },
    created() {
        this.getData();
    },
};
</script>
