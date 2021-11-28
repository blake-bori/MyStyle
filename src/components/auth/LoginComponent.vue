<template>
    <div>
        <!-- 현재 페이지 경로 -->
        <!-- Breadcrumb Section Begin -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h2>Login</h2>
                            <div class="breadcrumb__links">
                                <a href="./main">Home</a>
                                <span>Login</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Breadcrumb Section End -->

        <!-- 로그인 영역 -->
        <!-- Checkout Section Begin -->
        <section class="checkout spad">
            <div class="container">
                <div class="checkout__form">
                    <form action="#">
                        <div class="row">
                            <div class="col-lg-8 col-md-6">
                                <h6 class="checkout__title">Login</h6>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>ID<span>*</span></p>
                                            <input type="text" v-model="inputId" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>Password<span>*</span></p>
                                            <input type="password" v-model="inputPsw" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <button type="button" @click="requestLogin" class="site-btn">LOGIN</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <div class="checkout__order">
                                    <h4 class="order__title">Can't Login?</h4>
                                    <div class="checkout__order__products">Create an Account?</div>
                                    <button type="button" class="site-btn" onclick="location.href='./register'">Register</button>
                                    <div class="checkout__order__products mt-3">Forgot ID or PSW?</div>
                                    <button type="button" class="site-btn" onclick="location.href='#'">Find ID/PSW</button>
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
            inputId: "",
            inputPsw: "",
        };
    },
    methods: {
        requestLogin() {
            this.$emit("requestLogin", [this.inputId, this.inputPsw]);
        },
    },
};
</script>
