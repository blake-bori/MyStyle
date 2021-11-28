<template>
    <div>
        <!-- Breadcrumb Section Begin -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h2>Register</h2>
                            <div class="breadcrumb__links mb-3">
                                <a href="./main">Home</a>
                                <a href="./login">Login</a>
                                <a href="#" @click="previousStep">Register(Information)</a>
                                <span>Register(Body Modeling)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- Checkout Section Begin -->
        <section class="checkout spad">
            <div class="container">
                <div class="checkout__form">
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-4 col-md-6 mb-5">
                                <div class="checkout__order">
                                    <h4 class="order__title">Body Size</h4>
                                    <div for="bodysize_1" class="checkout__order__products font-weight-bold">
                                        Gender <span>{{ bodySize[0] }}</span>
                                    </div>
                                    <input id="bodysize_1" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize[0]" />
                                    <div for="bodysize_2" class="checkout__order__products font-weight-bold">
                                        Height <span>{{ bodySize[1] }}</span>
                                    </div>
                                    <input id="bodysize_2" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize[1]" />
                                    <div for="bodysize_3" class="checkout__order__products font-weight-bold">
                                        Weight <span>{{ bodySize[2] }}</span>
                                    </div>
                                    <input id="bodysize_3" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize[2]" />
                                    <div for="bodysize_4" class="checkout__order__products font-weight-bold">
                                        Proportions <span>{{ bodySize[3] }}</span>
                                    </div>
                                    <input id="bodysize_4" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize[3]" />
                                    <div for="bodysize_5" class="checkout__order__products font-weight-bold">
                                        Muscle <span>{{ bodySize[4] }}</span>
                                    </div>
                                    <input id="bodysize_5" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize[4]" />
                                    <button type="button" class="site-btn" @click="requestRegister">Next Step</button>
                                </div>
                            </div>
                            <RegisterBodyModelComponent class="col-lg-8 col-md-6"></RegisterBodyModelComponent>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <!-- Checkout Section End -->
    </div>
</template>
<script>
import RegisterBodyModelComponent from "@/components/auth/RegisterBodyModelComponent.vue";
export default {
    components: {
        RegisterBodyModelComponent,
    },
    data() {
        return {
            bodySize: [0, 0.5, 0.5, 0.5, 0.5],
        };
    },
    methods: {
        previousStep() {
            this.$emit("back");
        },

        requestRegister() {
            this.bodySize[0] = parseFloat(this.bodySize[0]);
            this.bodySize[1] = parseFloat(this.bodySize[1]);
            this.bodySize[2] = parseFloat(this.bodySize[2]);
            this.bodySize[3] = parseFloat(this.bodySize[3]);
            this.bodySize[4] = parseFloat(this.bodySize[4]);
            this.$emit("requestRegister", this.bodySize);
        },
    },
};
</script>
