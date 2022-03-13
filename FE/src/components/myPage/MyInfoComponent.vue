<template
    ><div>
        <!-- 상단 메뉴바 section -->
        <section class="breadcrumb-option">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="breadcrumb__text">
                            <h4>About Us</h4>
                            <div class="breadcrumb__links">
                                <a href="./main">Home</a>
                                <a href="./my_info">My Page</a>
                                <span>My Information</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 상단 메뉴바 section End -->

        <!-- 나의 정보 section -->
        <section class="about spad">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="about__pic">
                            <img src="img/about/about-us.jpg" alt="" />
                        </div>
                    </div>
                </div>
                <div class="row">
                    <!-- 나의 정보 불러오기 -->
                    <div class="col-lg-6 col-md-6 mb-4">
                        <div class="about__item">
                            <h4>{{ myInfoData.userName }}님의 정보</h4>
                            <p>ID : {{ myInfoData.userId }}</p>
                            <p>Name : {{ myInfoData.userName }}</p>
                        </div>
                        <div class="mt-2 float-right"><a class="gotoShopCart" href="#">정보 수정</a></div>
                    </div>
                    <!-- 찜 목록 불러오기 -->
                    <div class="col-lg-6 col-md-6">
                        <div class="about__item">
                            <h4>나의 찜 목록</h4>
                            <div v-for="product in myHeartList" :key="product.name+product.mysize">
                                <p>{{ product.name }} - {{ product.mysize }}</p>
                            </div>

                        </div>
                        <div class="mt-2 float-right"><a class="gotoShopCart" href="/shopping_cart">쇼핑 카트로 이동</a></div>
                    </div>
                </div>
            </div>
        </section>
        <!-- 나의 정보 section End -->
    </div>
</template>

<script>
export default {
    computed: {
        // 나의 정보 불러오기
        myInfoData() {
            return this.$store.state.user.user;
        },
        // 나의 찜 목록 불러오기
        myHeartList() {
            return this.$store.state.user.heartData;
        },
    },
};
</script>
