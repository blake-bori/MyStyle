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
                                <span>Register(Infomation)</span>
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
                            <div class="col-lg-8 col-md-6">
                                <h6 class="checkout__title"><span class="icon_contacts_alt"></span> Basic Information</h6>
                                <div class="checkout__input">
                                    <p>이름<span>*</span></p>
                                    <input type="text" />
                                </div>
                                <div class="checkout__input">
                                    <p>ID<span>*</span></p>
                                    <input type="text" />
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>비밀번호<span>*</span></p>
                                            <input type="password" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>비밀번호 확인<span>*</span></p>
                                            <input type="password" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="checkout__order">
                                    <h4 class="order__title">Progress</h4>
                                    <div class="checkout__order__products font-weight-bold">Input <span>Clear?</span></div>
                                    <ul class="checkout__total__products">
                                        <li>Name <span>No</span></li>
                                        <li>ID <span>No</span></li>
                                        <li>PSW <span>No</span></li>
                                    </ul>
                                    <div style="height:65px"></div>
                                    <button type="button" class="site-btn" @click="nextStep">Next Step</button>
                                </div>
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
export default {
    data() {
        return {
            id: null,
            psw: null,
            psw2: null,
            name: "",
            nickname: null,
        };
    },
    methods: {
        nextStep() {
            this.$emit("next");
        },
    },
};
</script>
