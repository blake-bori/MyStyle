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
                                    <input type="text" v-model="inputName" />
                                </div>
                                <div class="checkout__input">
                                    <p>ID<span>*</span></p>
                                    <input type="text" v-model="inputId" />
                                </div>
                                <div class="row">
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>비밀번호<span>*</span></p>
                                            <input type="password" v-model="inputPsw1" />
                                        </div>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="checkout__input">
                                            <p>비밀번호 확인<span>*</span></p>
                                            <input type="password" v-model="inputPsw2" />
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
            inputId: "",
            inputPsw1: "",
            inputPsw2: "",
            inputName: "",
        };
    },
    methods: {
        nextStep() {
            // 비밀번호 확인 올바르게 입력 시 통과
            if (this.inputPsw1 === this.inputPsw2) {
                alert("비번 같음");
                this.$emit("next", [this.inputId, this.inputPsw1, this.inputName]);
            }
            // 비밀번호 확인 올바르지 않으면 다시 입력하도록 유도
            else {
                alert("비번 다름");
            }
        },
    },
};
</script>
