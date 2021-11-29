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
                                        Gender <span>{{ bodySize.gender }}</span>
                                    </div>
                                    <input id="bodysize_1" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.gender" />
                                    <div for="bodysize_2" class="checkout__order__products font-weight-bold">
                                        Height <span>{{ bodySize.height }}</span>
                                    </div>
                                    <input id="bodysize_2" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.height" />
                                    <div for="bodysize_3" class="checkout__order__products font-weight-bold">
                                        Weight <span>{{ bodySize.weight }}</span>
                                    </div>
                                    <input id="bodysize_3" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.weight" />
                                    <div for="bodysize_4" class="checkout__order__products font-weight-bold">
                                        Proportions <span>{{ bodySize.proportions }}</span>
                                    </div>
                                    <input id="bodysize_4" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.proportions" />
                                    <div for="bodysize_5" class="checkout__order__products font-weight-bold">
                                        Muscle <span>{{ bodySize.muscle }}</span>
                                    </div>
                                    <input id="bodysize_5" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.muscle" />
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
            bodySize: { gender: 0, height: 0.5, weight: 0.5, proportions: 0.5, muscle: 0.5 },
        };
    },
    methods: {
        previousStep() {
            this.$emit("back");
        },

        requestRegister() {
            this.bodySize.gender = parseFloat(this.bodySize.gender);
            this.bodySize.height = parseFloat(this.bodySize.height);
            this.bodySize.weight = parseFloat(this.bodySize.weight);
            this.bodySize.proportions = parseFloat(this.bodySize.proportions);
            this.bodySize.muscle = parseFloat(this.bodySize.muscle);
            this.$emit("requestRegister", this.bodySize);
        },
    },
};
</script>
