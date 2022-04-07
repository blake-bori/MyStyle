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
                            <!-- 할일 : 기본 모델로 s,m,l,xl 모델을 만들 수 있게 추가 -->
                            <!-- 이후 슬라이더바 조절로 세부 조정 가능하게 설정 -->
                            <div class="col-lg-4 col-md-6 mb-5">
                                <div class="checkout__order">
                                    <h4 class="order__title">Body Size</h4>
                                    <div for="bodysize_1" class="checkout__order__products font-weight-bold">
                                        성별(0여, 1남) <span>{{ bodySize.gender }}</span>
                                    </div>
                                    <input id="bodysize_1" type="range" class="custom-range mb-4" min="0" max="1" step="1" v-model="bodySize.gender" />
                                    <div for="bodysize_2" class="checkout__order__products font-weight-bold">
                                        키(cm) <span>{{ bodySize.height }}</span>
                                    </div>
                                    <input v-if="bodySize.gender == 0" id="bodysize_2" type="range" class="custom-range mb-4" min="125" max="175" step="1" v-model="bodySize.height" />
                                    <input v-else id="bodysize_2" type="range" class="custom-range mb-4" min="140" max="190" step="1" v-model="bodySize.height" />
                                    <div for="bodysize_3" class="checkout__order__products font-weight-bold">
                                        몸무게 <span>{{ bodySize.weight }}</span>
                                    </div>
                                    <input id="bodysize_3" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.weight" />
                                    <div for="bodysize_4" class="checkout__order__products font-weight-bold">
                                        어깨, 복부 비율 <span>{{ bodySize.proportions }}</span>
                                    </div>
                                    <input id="bodysize_4" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.proportions" />
                                    <div for="bodysize_5" class="checkout__order__products font-weight-bold">
                                        근육량 <span>{{ bodySize.muscle }}</span>
                                    </div>
                                    <input id="bodysize_5" type="range" class="custom-range mb-4" min="0" max="1" step="0.01" v-model="bodySize.muscle" />
                                    <button type="button" class="site-btn" @click="requestRegister">Next Step</button>
                                </div>
                            </div>
                            <div class="model-canvas" style="border :1px black solid">
                                <div id="body_model_canvas"></div>
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
    components: {
    },
    data() {
        return {
            sampleModel:"",
            bodySize: { gender: 0, height: 160, weight: 0.5, proportions: 0.5, muscle: 0.5, model: "" },
            app:null,
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
            this.bodySize.model=this.app.printModel();

            this.$emit("requestRegister", this.bodySize);
        },
    },
    mounted(){
        /* eslint-disable no-unused-vars */
        /* eslint-disable no-undef */
        // makehuman-data 파일 내의 모델 신체 수치 데이터 불러오기
        var loadUrls = {
            modeling_sliders: "js/makehuman-data/src/json/sliders/modeling_sliders.json",
            resources: "js/makehuman-data/public/data/resources.json",
        };
        console.log(loadUrls);

        // 불러온 신체 수치 데이터들을 mapping 시킴
        var loader = new THREE.XHRLoader();
        Promise.all(_.values(loadUrls).map((url) => new Promise((resolve, reject) => loader.load(url, (data) => resolve(JSON.parse(data))))))
            .then((data) => {
                var keys = Object.keys(loadUrls);
                console.log(keys);
                console.log(data);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    window[key] = data[i];
                }
            })
            .then(() => {
                // 모델 띄우는 화면 렌더
                resources.baseUrl = "js/makehuman-data/public/data/";
                this.app = new App(resources, modeling_sliders);
                this.app.init();
                this.app.animate();
            });
    }
};
</script>