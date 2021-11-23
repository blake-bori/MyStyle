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
                            <div class="col-lg-4 col-md-6">
                                <div class="checkout__order">
                                    <h4 class="order__title">Body Size</h4>
                                    <div class="checkout__order__products font-weight-bold mb">Body Size-1 <span>30</span></div>
                                    <input type="range" class="custom-range mb-4" />
                                    <div class="checkout__order__products font-weight-bold">Body Size-2 <span>40</span></div>
                                    <input type="range" class="custom-range mb-4" />
                                    <div class="checkout__order__products font-weight-bold">Body Size-3 <span>50</span></div>
                                    <input type="range" class="custom-range mb-4" />
                                    <div class="checkout__order__products font-weight-bold">Body Size-4 <span>60</span></div>
                                    <input type="range" class="custom-range mb-4" />
                                    <div class="checkout__order__products font-weight-bold">Body Size-5 <span>70</span></div>
                                    <input type="range" class="custom-range mb-4" />
                                    <button type="button" class="site-btn" @click="requestRegister">Next Step</button>
                                </div>
                            </div>
                            <div class="col-lg-8 col-md-6" style="border: 1px solid black; min-height:400px">
                                <ShowModel />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
        <!-- Checkout Section End -->
    </div>
</template>
<script>

    import ShowModel from './ShowModel.vue'

export default {
    components : {
        ShowModel
    },
    data() {
        return {
            bodySize: {
                size1: 0,
                size2: 1,
                size3: 2,
                size4: 3,
                size5: 4,
            },
        };
    },
    methods: {
        previousStep() {
            this.$emit("back");
        },

        requestRegister() {
            console.log("회원가입 요청");
            console.log(this.bodySize);
        },
    },
};
</script>
